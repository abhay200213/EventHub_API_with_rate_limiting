export interface Event {
  id?: string;
  name: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  registrationCount: number;
  status: "active" | "cancelled" | "completed";
  categoryId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventInput {
  name: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  status: "active" | "cancelled" | "completed";
  categoryId: string;
  createdBy: string;
}

export interface UpdateEventInput {
  name?: string;
  description?: string;
  date?: string;
  location?: string;
  capacity?: number;
  registrationCount?: number;
  status?: "active" | "cancelled" | "completed";
  categoryId?: string;
  updatedAt?: string;
}