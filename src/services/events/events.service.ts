/**
 * Data Model Interfaces
 */
import NotFoundError from "../../errors/NotFoundError";
import { BaseEvent, Event } from "../../models/events.interface";

/**
 * In-Memory Store
 * FOR TESTS. WILL BE PULLED FROM DB
 */
export const events: Event[] = [
  {
    id: 1,
    title: "Test Event",
    price: 0,
    description: "This is a test event",
    imageUrl: "#",
    date: new Date().toString(),
    location: {
      city: "Birmingham",
      state: "Alabama",
      country: "United States",
      coordinates: { lat: 33.543682, long: -86.779633 },
    },
  },
];

/**
 * Service Methods
 * FOR TESTS. WILL BE USED ON DB
 */
export const findAll = async (): Promise<Event[]> => events;

export const findOne = async (id: number): Promise<Event> => {
  let event: Event | undefined = events.find((event: Event) => event.id === id);

  if (!event) {
    throw new NotFoundError(`No event exists with the id of ${id}`);
  }

  return event;
};
