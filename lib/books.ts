export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  pageCount?: number;
};

type OpenLibraryDoc = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  number_of_pages_median?: number;
};

export async function searchBooks(query: string): Promise<Book[]> {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`,
  );
  if (!response.ok) throw new Error("Search failed");
  const data = await response.json();

  return data.docs.map((doc: OpenLibraryDoc) => ({
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown author",
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : undefined,
    pageCount: doc.number_of_pages_median,
  }));
}
