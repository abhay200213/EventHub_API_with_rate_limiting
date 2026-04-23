import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationById,
  deleteRegistrationById,
} from "../src/api/v1/services/registrationService";

import {
  createRegistrationRepo,
  deleteRegistrationByIdRepo,
  getAllRegistrationsRepo,
  getRegistrationByIdRepo,
  updateRegistrationByIdRepo,
} from "../src/api/v1/repositories/registrationRepository";

jest.mock("../src/api/v1/repositories/registrationRepository", () => ({
  createRegistrationRepo: jest.fn(),
  getAllRegistrationsRepo: jest.fn(),
  getRegistrationByIdRepo: jest.fn(),
  updateRegistrationByIdRepo: jest.fn(),
  deleteRegistrationByIdRepo: jest.fn(),
}));

describe("registrationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createRegistration", () => {
    it("should create a registration with default status, registeredAt, and updatedAt", async () => {
      const input = {
        eventId: "evt123",
        userId: "user123",
      };

      (createRegistrationRepo as jest.Mock).mockImplementation(async (registrationData) => ({
        id: "reg123",
        ...registrationData,
      }));

      const result = await createRegistration(input);

      expect(createRegistrationRepo).toHaveBeenCalledTimes(1);
      expect(createRegistrationRepo).toHaveBeenCalledWith(
        expect.objectContaining({
          ...input,
          status: "registered",
          registeredAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );

      expect(result).toEqual(
        expect.objectContaining({
          id: "reg123",
          ...input,
          status: "registered",
          registeredAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });

    it("should create a registration with provided status", async () => {
      const input = {
        eventId: "evt123",
        userId: "user123",
        status: "cancelled" as const,
      };

      (createRegistrationRepo as jest.Mock).mockImplementation(async (registrationData) => ({
        id: "reg456",
        ...registrationData,
      }));

      const result = await createRegistration(input);

      expect(createRegistrationRepo).toHaveBeenCalledWith(
        expect.objectContaining({
          ...input,
          status: "cancelled",
          registeredAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );

      expect(result).toEqual(
        expect.objectContaining({
          id: "reg456",
          ...input,
          registeredAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });
  });

  describe("getAllRegistrations", () => {
    it("should return all registrations", async () => {
      const mockRegistrations = [
        {
          id: "reg1",
          eventId: "evt1",
          userId: "user1",
          status: "registered",
          registeredAt: "2026-04-23T10:00:00.000Z",
          updatedAt: "2026-04-23T10:00:00.000Z",
        },
      ];

      (getAllRegistrationsRepo as jest.Mock).mockResolvedValue(mockRegistrations);

      const result = await getAllRegistrations();

      expect(getAllRegistrationsRepo).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockRegistrations);
    });
  });

  describe("getRegistrationById", () => {
    it("should return a registration when found", async () => {
      const mockRegistration = {
        id: "reg1",
        eventId: "evt1",
        userId: "user1",
        status: "registered",
        registeredAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      (getRegistrationByIdRepo as jest.Mock).mockResolvedValue(mockRegistration);

      const result = await getRegistrationById("reg1");

      expect(getRegistrationByIdRepo).toHaveBeenCalledWith("reg1");
      expect(result).toEqual(mockRegistration);
    });

    it("should return null when registration is not found", async () => {
      (getRegistrationByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await getRegistrationById("missing-id");

      expect(getRegistrationByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(result).toBeNull();
    });
  });

  describe("updateRegistrationById", () => {
    it("should update and return the registration when it exists", async () => {
      const existingRegistration = {
        id: "reg1",
        eventId: "evt1",
        userId: "user1",
        status: "registered",
        registeredAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      const updates = {
        status: "cancelled" as const,
      };

      const updatedRegistration = {
        ...existingRegistration,
        ...updates,
        updatedAt: "2026-04-23T12:00:00.000Z",
      };

      (getRegistrationByIdRepo as jest.Mock).mockResolvedValue(existingRegistration);
      (updateRegistrationByIdRepo as jest.Mock).mockResolvedValue(updatedRegistration);

      const result = await updateRegistrationById("reg1", updates);

      expect(getRegistrationByIdRepo).toHaveBeenCalledWith("reg1");
      expect(updateRegistrationByIdRepo).toHaveBeenCalledTimes(1);
      expect(updateRegistrationByIdRepo).toHaveBeenCalledWith(
        "reg1",
        expect.objectContaining({
          ...updates,
          updatedAt: expect.any(String),
        })
      );
      expect(result).toEqual(updatedRegistration);
    });

    it("should return null when trying to update a non-existing registration", async () => {
      (getRegistrationByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await updateRegistrationById("missing-id", {
        status: "cancelled",
      });

      expect(getRegistrationByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(updateRegistrationByIdRepo).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe("deleteRegistrationById", () => {
    it("should delete and return true when registration exists", async () => {
      const existingRegistration = {
        id: "reg1",
        eventId: "evt1",
        userId: "user1",
        status: "registered",
        registeredAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      (getRegistrationByIdRepo as jest.Mock).mockResolvedValue(existingRegistration);
      (deleteRegistrationByIdRepo as jest.Mock).mockResolvedValue(true);

      const result = await deleteRegistrationById("reg1");

      expect(getRegistrationByIdRepo).toHaveBeenCalledWith("reg1");
      expect(deleteRegistrationByIdRepo).toHaveBeenCalledWith("reg1");
      expect(result).toBe(true);
    });

    it("should return false when trying to delete a non-existing registration", async () => {
      (getRegistrationByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await deleteRegistrationById("missing-id");

      expect(getRegistrationByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(deleteRegistrationByIdRepo).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});