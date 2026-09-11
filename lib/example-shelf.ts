import type { ShelfBook } from "./shelf";
import { daysFromToday } from "./dates";

export const EXAMPLE_SHELF = (): ShelfBook[] => [
  {
    id: "ex-1",
    title: "Case Closed Vol. 3",
    author: "Gosho Aoyama",
    pageCount: 184,
    status: "reading",
    pagesRead: 133,
    startedAt: daysFromToday(-3),
  },
  {
    id: "ex-2",
    title: "The Ember Knight",
    author: "Hwandaeng",
    pageCount: 246,
    status: "want",
    pagesRead: 0,
  },
  {
    id: "ex-3",
    title: "Violet Evergarden, Vol. 1",
    author: "Kana Akatsuki",
    pageCount: 272,
    status: "scheduled",
    pagesRead: 0,
    startDate: daysFromToday(7),
  },
  {
    id: "ex-4",
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    pageCount: 636,
    status: "scheduled",
    pagesRead: 0,
    startDate: daysFromToday(-2),
  },
  {
    id: "ex-5",
    title: "Frieren: Beyond Journey's End, Vol. 1",
    author: "Kanehito Yamada & Tsukasa Abe",
    pageCount: 192,
    status: "finished",
    pagesRead: 192,
    startedAt: daysFromToday(-40),
    finishedAt: daysFromToday(-28),
  },
];
