export interface Registration {
  id?: string;
  eventId: string;
  userId: string;
  status: "registered" | "cancelled";
  registeredAt: string;
  updatedAt: string;
}

export interface CreateRegistrationInput {
  eventId: string;
  userId: string;
  status?: "registered" | "cancelled";
}

export interface UpdateRegistrationInput {
  eventId?: string;
  userId?: string;
  status?: "registered" | "cancelled";
  updatedAt?: string;
}