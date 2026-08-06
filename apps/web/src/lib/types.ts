export interface Game {
  id: string;
  slug: string;
  name: string;
  ramMinGo: number;
  cpuMinCores: number;
  diskMinGo: number;
  monthlyPrice: number;
  isActive: boolean;
}

export type ServerStatus = "PENDING" | "RUNNING" | "SUSPENDED" | "DELETED";

export interface GameServer {
  id: string;
  name: string;
  status: ServerStatus;
  ramGo: number;
  cpuCores: number;
  diskGo: number;
  prixMensuel: number;
  expiresAt: string | null;
  createdAt: string;
  game: Game;
  pterodactylIdentifier: string | null;
}

export type TicketStatus = "OPEN" | "CLOSED";

export interface SupportMessage {
  id: string;
  body: string;
  fromAdmin: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: TicketStatus;
  createdAt: string;
  messages?: SupportMessage[];
}

export interface AuthUser {
  id: string;
  email: string;
}
