import { createFileRoute } from "@tanstack/react-router";
import { useShelf, SECTIONS } from "@/lib/shelf";
import { formatDate } from "@/lib/dates";
import { ReadingCard } from "@/components/ReadingCard";

export const Route = createFileRoute("/")({
  component: Shelf,
});

function Shelf() {
  const { shelf, update, loadExample, clear } = useShelf();

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

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-8 py-10">
      {SECTIONS.map(({ status, label }) => {
        const books = shelf.filter((b) => b.status === status);
        if (books.length === 0) return null;

        return (
          <section key={status}>
            <h2 className="mb-2 text-sm uppercase text-white/70">{label}</h2>
            {books.map((book) =>
              book.status === "reading" ? (
                <ReadingCard key={book.id} book={book} update={update} />
              ) : (
                <div
                  key={book.id}
                  className="mb-2 rounded-md bg-white/10 px-4 py-3"
                >
                  <p>{book.title}</p>
                  <p className="text-sm text-white/60">{book.author}</p>
                  {book.startDate && (
                    <p className="text-sm text-white/60">
                      Starts {formatDate(book.startDate)}
                    </p>
                  )}
                </div>
              ),
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
