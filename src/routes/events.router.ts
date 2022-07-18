/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response, NextFunction } from "express";
import * as EventsService from "../services/events/events.service";
import { BaseEvent, Event } from "../models/events.interface";
import asyncMiddleware from "../middleware/asyncMiddleware";

/**
 * Router Definition
 */
const router = express.Router();

/**
 * Controller Definitions
 */
router.get(
  "/",
  asyncMiddleware(async (req: Request, res: Response) => {
    const events: Event[] = await EventsService.findAll();
    res.json(events);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const event: Event = await EventsService.findOne(id);
    res.json(event);
  })
);

export default router;
