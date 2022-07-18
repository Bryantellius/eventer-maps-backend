export interface EventLocation {
  city: string;
  state: string;
  country: string;
  coordinates: { lat: number; long: number };
}

export interface BaseEvent {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  date: string;
  location: EventLocation;
}

export interface Event extends BaseEvent {
  id: number;
}
