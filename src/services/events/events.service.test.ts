import NotFoundError from "../../errors/NotFoundError";
import * as EventsService from "./events.service";

describe("EventsService Find Methods", () => {
  test("should return all events", () => {
    return expect(EventsService.findAll()).resolves.toEqual(
      EventsService.events
    );
  });

  test("should return an event by id", () => {
    return expect(EventsService.findOne(1)).resolves.toEqual(
      EventsService.events[0]
    );
  });

  test("should throw a NotFoundError", () => {
    return expect(EventsService.findOne(2)).rejects.toThrow(NotFoundError);
  });
});
