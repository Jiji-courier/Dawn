import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useShelf, SECTIONS, type ShelfBook } from "@/lib/shelf";
import { formatDate, todayISO, daysBetween } from "@/lib/dates";
import { ReadingCard } from "@/components/ReadingCard";
import { Spine } from "@/components/Spine";
import { SchedulePicker } from "@/components/SchedulePicker";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Route = createFileRoute("/")({
  component: Shelf,
});

function Shelf() {
  const { shelf, update, loadExample, clear } = useShelf();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = shelf.find((b) => b.id === selectedId);

  if (shelf.length === 0) {
    return (
      <main className="px-8 py-10 text-center">
        <p>No books yet.</p>
        <button onClick={loadExample} className="mt-2 underline">
          Load example shelf
        </button>
      </main>
    );
  }

  function toggle(id: string) {
    setSelectedId(id === selectedId ? null : id);
  }

  return (
    <main className="mx-auto max-w-3xl space-y-10 px-8 py-10">
      {SECTIONS.map(({ status, label }) => {
        const books = shelf.filter((b) => b.status === status);
        if (books.length === 0) return null;

        return (
          <section key={status}>
            <h2 className="mb-2 text-sm uppercase text-white/70">{label}</h2>

            {status === "reading" ? (
              <div className="space-y-3">
                {books.map((book) => (
                  <ReadingCard key={book.id} book={book} update={update} />
                ))}
              </div>
            ) : (
              <>
                <div className="bookcase rounded-t-sm px-3">
                  <div className="flex items-end gap-1 overflow-x-auto pt-5">
                    {books.map((book, i) => (
                      <Spine
                        key={book.id}
                        book={book}
                        index={i}
                        selected={book.id === selectedId}
                        onClick={() => toggle(book.id)}
                      />
                    ))}
                  </div>
                </div>
                <div className="shelf-ledge rounded-b-sm" />
                {selected?.status === status && (
                  <BookDetails book={selected} update={update} />
                )}
              </>
            )}
          </section>
        );
      })}

      <button onClick={clear} className="text-sm text-white/50 underline">
        Clear shelf
      </button>
    </main>
  );
}

type DetailsProps = {
  book: ShelfBook;
  update: (id: string, changes: Partial<ShelfBook>) => void;
};

function BookDetails({ book, update }: DetailsProps) {
  const overdue =
    book.status === "scheduled" &&
    book.startDate !== undefined &&
    book.startDate < todayISO();

  function startNow() {
    update(book.id, {
      status: "reading",
      startedAt: todayISO(),
      startDate: undefined,
    });
  }

  return (
    <div className="mt-3 flex gap-4 rounded-md bg-white/10 p-4">
      {book.coverUrl && (
        <img src={book.coverUrl} alt={book.title} className="w-16 rounded" />
      )}

      <div className="flex-1">
        <p className="font-medium">{book.title}</p>
        <p className="text-sm text-white/60">{book.author}</p>

        {book.startDate && !overdue && (
          <p className="mt-1 text-sm text-white/60">
            Starts {formatDate(book.startDate)}
          </p>
        )}
        {overdue && book.startDate && (
          <p className="mt-1 text-sm text-amber-300">
            The best time to read this was{" "}
            {daysBetween(book.startDate, todayISO())} days ago, the second best
            is now
          </p>
        )}

        {book.status !== "finished" && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={startNow}>
              Start now
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                  {book.status === "scheduled" ? "Reschedule" : "Schedule"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <SchedulePicker
                  startDate={book.startDate}
                  onPick={(iso) =>
                    update(book.id, { status: "scheduled", startDate: iso })
                  }
                />
              </PopoverContent>
            </Popover>

            {book.status === "scheduled" && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  update(book.id, { status: "want", startDate: undefined })
                }
              >
                Unschedule
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
