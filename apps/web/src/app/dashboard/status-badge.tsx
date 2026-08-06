import type { ServerStatus, TicketStatus } from "@/lib/types";

const STYLES: Record<string, string> = {
  RUNNING: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400",
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
  SUSPENDED: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
  DELETED: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  OPEN: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
  CLOSED: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
};

export function StatusBadge({ status }: { status: ServerStatus | TicketStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}>
      {status}
    </span>
  );
}
