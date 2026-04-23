import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
} from "../src/api/v1/services/eventService";

import {
  createEventRepo,
  deleteEventByIdRepo,
  getAllEventsRepo,
  getEventByIdRepo,
  updateEventByIdRepo,
} from "../src/api/v1/repositories/eventRepository";

jest.mock("../src/api/v1/repositories/eventRepository", () => ({
  createEventRepo: jest.fn(),
  getAllEventsRepo: jest.fn(),
  getEventByIdRepo: jest.fn(),
  updateEventByIdRepo: jest.fn(),
  deleteEventByIdRepo: jest.fn(),
}));

describe("eventService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createEvent", () => {
    it("should create an event with registrationCount, createdAt, and updatedAt", async () => {
      const input = {
        name: "Backend Demo",
        description: "Milestone test event",
        date: "2026-05-10T18:00:00.000Z",
        location: "Winnipeg",
        capacity: 100,
        status: "active" as const,
        categoryId: "cat123",
        createdBy: "user123",
      };

      (createEventRepo as jest.Mock).mockImplementation(async (eventData) => ({
        id: "evt123",
        ...eventData,
      }));

      const result = await createEvent(input);

      expect(createEventRepo).toHaveBeenCalledTimes(1);
      expect(createEventRepo).toHaveBeenCalledWith(
        expect.objectContaining({
          ...input,
          registrationCount: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );

      expect(result).toEqual(
        expect.objectContaining({
          id: "evt123",
          ...input,
          registrationCount: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });
  });

  describe("getAllEvents", () => {
    it("should return all events", async () => {
      const mockEvents = [
        {
          id: "evt1",
          name: "Event 1",
          description: "Desc 1",
          date: "2026-05-10T18:00:00.000Z",
          location: "Winnipeg",
          capacity: 50,
          registrationCount: 0,
          status: "active",
          categoryId: "cat1",
          createdBy: "user1",
          createdAt: "2026-04-23T10:00:00.000Z",
          updatedAt: "2026-04-23T10:00:00.000Z",
        },
      ];

      (getAllEventsRepo as jest.Mock).mockResolvedValue(mockEvents);

      const result = await getAllEvents();

      expect(getAllEventsRepo).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEvents);
    });
  });

  describe("getEventById", () => {
    it("should return an event when found", async () => {
      const mockEvent = {
        id: "evt1",
        name: "Event 1",
        description: "Desc 1",
        date: "2026-05-10T18:00:00.000Z",
        location: "Winnipeg",
        capacity: 50,
        registrationCount: 0,
        status: "active",
        categoryId: "cat1",
        createdBy: "user1",
        createdAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      (getEventByIdRepo as jest.Mock).mockResolvedValue(mockEvent);

      const result = await getEventById("evt1");

      expect(getEventByIdRepo).toHaveBeenCalledWith("evt1");
      expect(result).toEqual(mockEvent);
    });

    it("should return null when event is not found", async () => {
      (getEventByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await getEventById("missing-id");

      expect(getEventByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(result).toBeNull();
    });
  });

  describe("updateEventById", () => {
    it("should update and return the event when it exists", async () => {
      const existingEvent = {
        id: "evt1",
        name: "Old Event",
        description: "Old Desc",
        date: "2026-05-10T18:00:00.000Z",
        location: "Winnipeg",
        capacity: 50,
        registrationCount: 0,
        status: "active",
        categoryId: "cat1",
        createdBy: "user1",
        createdAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      const updates = {
        name: "Updated Event",
        capacity: 120,
      };

      const updatedEvent = {
        ...existingEvent,
        ...updates,
        updatedAt: "2026-04-23T12:00:00.000Z",
      };

      (getEventByIdRepo as jest.Mock).mockResolvedValue(existingEvent);
      (updateEventByIdRepo as jest.Mock).mockResolvedValue(updatedEvent);

      const result = await updateEventById("evt1", updates);

      expect(getEventByIdRepo).toHaveBeenCalledWith("evt1");
      expect(updateEventByIdRepo).toHaveBeenCalledTimes(1);
      expect(updateEventByIdRepo).toHaveBeenCalledWith(
        "evt1",
        expect.objectContaining({
          ...updates,
          updatedAt: expect.any(String),
        })
      );
      expect(result).toEqual(updatedEvent);
    });

    it("should return null when trying to update a non-existing event", async () => {
      (getEventByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await updateEventById("missing-id", {
        name: "Updated Event",
      });

      expect(getEventByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(updateEventByIdRepo).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe("deleteEventById", () => {
    it("should delete and return true when event exists", async () => {
      const existingEvent = {
        id: "evt1",
        name: "Event 1",
        description: "Desc 1",
        date: "2026-05-10T18:00:00.000Z",
        location: "Winnipeg",
        capacity: 50,
        registrationCount: 0,
        status: "active",
        categoryId: "cat1",
        createdBy: "user1",
        createdAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      (getEventByIdRepo as jest.Mock).mockResolvedValue(existingEvent);
      (deleteEventByIdRepo as jest.Mock).mockResolvedValue(true);

      const result = await deleteEventById("evt1");

      expect(getEventByIdRepo).toHaveBeenCalledWith("evt1");
      expect(deleteEventByIdRepo).toHaveBeenCalledWith("evt1");
      expect(result).toBe(true);
    });

    it("should return false when trying to delete a non-existing event", async () => {
      (getEventByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await deleteEventById("missing-id");

      expect(getEventByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(deleteEventByIdRepo).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});