import { useEffect, useState } from "react";
import type { Book } from "./books";
import { EXAMPLE_SHELF } from "./example-shelf";

const KEY = "dawn-shelf";

export type Status = "want" | "scheduled" | "reading" | "finished";

export type ShelfBook = Book & {
    status: Status;
    pagesRead:  number;
    startDate?: string;
    startedAt?: string;
    finishedAt?: string;
    unit?: "pages" | "episodes"; // for webtoon 
}

export const SECTIONS: { status: Status; label: string }[] = [
    { status: "reading", label: "Dawn · in hand" },
    { status: "want", label: "Night" },
    { status: "scheduled", label: "Before Dawn" },
    { status: "finished", label: "Daylight" },
];

export function useShelf() {
    const [shelf, setShelf] = useState<ShelfBook[]>(() =>
        JSON.parse(localStorage.getItem(KEY) ?? "[]")
    );

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(shelf));
    }, [shelf]);

    const save = (book: Book) =>
        setShelf((s) => 
        s.some((b) => b.id === book.id) ? s: [...s, { ...book, status: "want", pagesRead: 0}]
    );

    const update = (id: string, changes: Partial<ShelfBook>) =>
        setShelf((s) => s.map((b) => (b.id === id ? { ...b, ...changes } : b)));
    
    const loadExample = () => setShelf(EXAMPLE_SHELF());
    const clear = () => setShelf([]);

    return { shelf, save, update, loadExample, clear };

}