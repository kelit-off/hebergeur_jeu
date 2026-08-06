import { notFound } from "next/navigation";
import { serverApiFetch, ApiError } from "@/lib/api";
import type { SupportTicket } from "@/lib/types";
import { StatusBadge } from "../../status-badge";
import { ReplyForm } from "./reply-form";

async function getTicket(id: string): Promise<SupportTicket | null> {
  try {
    return await serverApiFetch(`/support/tickets/${id}`);
  } catch (e) {
    if (e instanceof ApiError && (e.status === 404 || e.status === 403)) {
      return null;
    }
    throw e;
  }
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await getTicket(id);
  if (!ticket) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <div className="mb-8 flex items-center gap-3">
        <h1 className="text-2xl font-semibold">{ticket.subject}</h1>
        <StatusBadge status={ticket.status} />
      </div>

      <div className="mb-8 flex flex-col gap-4">
        {ticket.messages?.map((message) => (
          <div
            key={message.id}
            className={`max-w-[80%] rounded-lg p-4 text-sm ${
              message.fromAdmin
                ? "self-start bg-zinc-100 dark:bg-zinc-900"
                : "self-end bg-zinc-900 text-white dark:bg-white dark:text-black"
            }`}
          >
            <p>{message.body}</p>
            <p className="mt-2 text-xs opacity-60">
              {new Date(message.createdAt).toLocaleString("fr-FR")}
            </p>
          </div>
        ))}
      </div>

      <ReplyForm ticketId={ticket.id} />
    </div>
  );
}
