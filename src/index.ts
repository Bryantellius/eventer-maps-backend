/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import createError from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./lib/logger";
import expressPino from "express-pino-logger";
import NotFoundError from "./errors/NotFoundError";
import router from "./routes";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const app = express();

/**
 *  App Configuration
 */
const expressLogger = expressPino({ logger });
app.use(expressLogger);

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * App Routes
 */
app.use("/api/v1", router);

/**
 * Default Handler for 404 Not Found Routes
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

/**
 * Default Handler for Server Errors
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  // If the error is a NotFoundError
  // Sets the status and sends back message
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  // If the app is in development
  // sends back the status and message
  if (req.app.get("env") === "development") {
    return res.status(err.status || 500).json({ error: err.message });
  }

  // If the app is in production
  // sends back the status
  return res.sendStatus(err.status || 500);
});

// Safety net for any unhandled errors
process.on("unhandledRejection", (err: Error) => {
  console.error("unhandledRejection", err.message);
});

/**
 * Server Activation
 */
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
