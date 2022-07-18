import pino from "pino";

export default pino({
  transport: {
    target: "pino-pretty",
  },
  level: process.env.LOG_LEVEL || "warn",
});
