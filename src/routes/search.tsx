import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { searchBooks } from "@/lib/books";
import { useShelf } from "@/lib/shelf";

export const Route = createFileRoute("/search")({
  component: Search,
});

function Search() {
  const [query, setQuery] = useState("");
  const { shelf, save } = useShelf();

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchBooks(query),
    enabled: query.length > 0,
  });

  return (
    <main className="mx-auto max-w-3xl px-8 py-10">
      <Input
        placeholder="Type in a book name and press Enter"
        onKeyDown={(e) => {
          if (e.key === "Enter") setQuery(e.currentTarget.value.trim());
        }}
      />

      {isLoading && (
        <div className="mt-4 flex items-center gap-2">
          <Spinner />
          <p>Searching...</p>
        </div>
      )}
      {isError && <p className="mt-4">Something went wrong. Try again?</p>}
      {results?.length === 0 && (
        <p className="mt-4">
          The shelves are quiet on that one. Perhaps it's still being written.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {results?.map((book) => {
          const onShelf = shelf.some((b) => b.id === book.id);
          return (
            <Card
              key={book.id}
              className="bg-blue-100/20 backdrop-blur-sm rounded-md p-4 text-white overflow-hidden"
            >
              {book.coverUrl && (
                <img
                  className="w-full max-h-48 object-cover rounded"
                  src={book.coverUrl}
                  alt={book.title}
                />
              )}
              <h2>{book.title}</h2>
              <p className="text-sm text-white/70">{book.author}</p>
              <Button disabled={onShelf} onClick={() => save(book)}>
                {onShelf ? "On shelf" : "Save This"}
              </Button>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
