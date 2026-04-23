import {
  createEventRepo,
  deleteEventByIdRepo,
  getAllEventsRepo,
  getEventByIdRepo,
  updateEventByIdRepo,
} from "../repositories/eventRepository";
import {
  CreateEventInput,
  Event,
  UpdateEventInput,
} from "../types/eventTypes";

export const createEvent = async (input: CreateEventInput): Promise<Event> => {
  const now = new Date().toISOString();

  const eventData: Event = {
    ...input,
    registrationCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  return await createEventRepo(eventData);
};

export const getAllEvents = async (): Promise<Event[]> => {
  return await getAllEventsRepo();
};

export const getEventById = async (id: string): Promise<Event | null> => {
  return await getEventByIdRepo(id);
};

export const updateEventById = async (
  id: string,
  updates: UpdateEventInput
): Promise<Event | null> => {
  const existingEvent = await getEventByIdRepo(id);

  if (!existingEvent) {
    return null;
  }

  const updatedPayload: UpdateEventInput = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  return await updateEventByIdRepo(id, updatedPayload);
};

export const deleteEventById = async (id: string): Promise<boolean> => {
  const existingEvent = await getEventByIdRepo(id);

  if (!existingEvent) {
    return false;
  }

  return await deleteEventByIdRepo(id);
};