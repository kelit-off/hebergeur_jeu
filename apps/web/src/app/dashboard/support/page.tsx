import Link from "next/link";
import { serverApiFetch } from "@/lib/api";
import type { SupportTicket } from "@/lib/types";
import { StatusBadge } from "../status-badge";
import { NewTicketForm } from "./new-ticket-form";

async function getTickets(): Promise<SupportTicket[]> {
  try {
    return await serverApiFetch("/support/tickets");
  } catch {
    return [];
  }
}

export default async function SupportPage() {
  const tickets = await getTickets();

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Support</h1>

      <div className="mb-10 flex flex-col divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {tickets.length === 0 ? (
          <p className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
            Aucun ticket pour le moment.
          </p>
        ) : (
          tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/dashboard/support/${ticket.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <span className="font-medium">{ticket.subject}</span>
              <StatusBadge status={ticket.status} />
            </Link>
          ))
        )}
      </div>

      <NewTicketForm />
    </div>
  );
}
