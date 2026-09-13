import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ShelfBook } from "@/lib/shelf";
import { todayISO, daysBetween } from "@/lib/dates";
import { toast } from "sonner";

type Props = {
  book: ShelfBook;
  update: (id: string, changes: Partial<ShelfBook>) => void;
};

function checkPages(value: string, book: ShelfBook) {
  const pages = Number(value);
  if (!Number.isInteger(pages) || pages <= 0) return "Enter a positive integer";
  if (book.pageCount && book.pagesRead + pages > book.pageCount) {
    return `Only ${book.pageCount - book.pagesRead} pages left`;
  }
  return null;
}

export function ReadingCard({ book, update }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const percent = book.pageCount
    ? Math.round((book.pagesRead / book.pageCount) * 100)
    : 0;
  const day = book.startedAt ? daysBetween(book.startedAt, todayISO()) + 1 : 1;

  function logPages() {
    const problem = checkPages(value, book);
    setError(problem);
    if (problem) return;

    const newTotal = book.pagesRead + Number(value);
    const done = book.pageCount !== undefined && newTotal >= book.pageCount;

    update(book.id, {
      pagesRead: newTotal,
      ...(done && { status: "finished", finishedAt: todayISO() }),
    });
    if (done) toast.success(`${book.title} moved to Finished`);
    setValue("");
  }

  function finish() {
    update(book.id, {
      status: "finished",
      finishedAt: todayISO(),
      pagesRead: book.pageCount ?? book.pagesRead,
    });
    toast.success(`${book.title} moved to Finished`);
  }

  return (
    <div className="flex gap-5 rounded-md bg-white/15 p-5">
      {book.coverUrl && (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-24 rounded object-cover"
        />
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold">{book.title}</p>
            <p className="text-sm text-white/60">{book.author}</p>
          </div>
          <Button variant="outline" onClick={finish}>
            Finish
          </Button>
        </div>

        <div className="mt-4 flex justify-between text-sm text-white/70">
          <span>
            {book.pagesRead} of {book.pageCount ?? "?"} pages
          </span>
          <span>Day {day}</span>
        </div>
        <div className="mt-1 h-2 rounded-full bg-white/20">
          <div
            className="h-2 rounded-full bg-amber-400"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mt-4 flex w-56 items-center border-b border-white/50 focus-within:border-white">
          <input
            inputMode="numeric"
            placeholder="Pages read today"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && logPages()}
            className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-white/40"
          />
          <button
            onClick={logPages}
            className="text-xs font-semibold uppercase tracking-wider text-amber-300 hover:text-amber-200"
          >
            + Log
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
      </div>
    </div>
  );
}
