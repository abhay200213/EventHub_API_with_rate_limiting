import { db } from "../../../../config/firebaseConfig";
import { EVENTS_COLLECTION } from "../../../constants/eventConstants";
import { Event, UpdateEventInput } from "../types/eventTypes";

export const createEventRepo = async (event: Event): Promise<Event> => {
  const docRef = event.id
    ? db.collection(EVENTS_COLLECTION).doc(event.id)
    : db.collection(EVENTS_COLLECTION).doc();

  const eventWithId: Event = {
    ...event,
    id: docRef.id,
  };

  await docRef.set(eventWithId);
  return eventWithId;
};

export const getAllEventsRepo = async (): Promise<Event[]> => {
  const snapshot = await db.collection(EVENTS_COLLECTION).get();

  return snapshot.docs.map((doc) => doc.data() as Event);
};

export const getEventByIdRepo = async (id: string): Promise<Event | null> => {
  const doc = await db.collection(EVENTS_COLLECTION).doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return doc.data() as Event;
};

export const updateEventByIdRepo = async (
  id: string,
  updates: UpdateEventInput
): Promise<Event | null> => {
  const ref = db.collection(EVENTS_COLLECTION).doc(id);
  const existing = await ref.get();

  if (!existing.exists) {
    return null;
  }

  await ref.update(updates as Record<string, unknown>);
  const updated = await ref.get();

  return updated.data() as Event;
};

export const deleteEventByIdRepo = async (id: string): Promise<boolean> => {
  const ref = db.collection(EVENTS_COLLECTION).doc(id);
  const existing = await ref.get();

  if (!existing.exists) {
    return false;
  }

  await ref.delete();
  return true;
};