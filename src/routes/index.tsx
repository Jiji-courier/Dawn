import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useShelf, SECTIONS, type ShelfBook } from "@/lib/shelf";
import { formatDate } from "@/lib/dates";
import { ReadingCard } from "@/components/ReadingCard";
import { Spine } from "@/components/Spine";

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
                {selected?.status === status && <BookDetails book={selected} />}
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

function BookDetails({ book }: { book: ShelfBook }) {
  return (
    <div className="mt-3 flex gap-4 rounded-md bg-white/10 p-4">
      {book.coverUrl && (
        <img src={book.coverUrl} alt={book.title} className="w-16 rounded" />
      )}
      <div>
        <p className="font-medium">{book.title}</p>
        <p className="text-sm text-white/60">{book.author}</p>
        {book.startDate && (
          <p className="mt-1 text-sm text-white/60">
            Starts {formatDate(book.startDate)}
          </p>
        )}
      </div>
    </div>
  );
}
