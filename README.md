# Dawn
A reading planner. Books move through four states: Want to read -> Scheduled -> Reading -> Finished.
All data lives in the browser's local storage and "Load example shelf" fills books
in each state.

## v_1 -> v_2
v1 was a simplistic web that searched Open Library and saved/unsaved books.
v2 rebuilds it around the life-cycle card pattern from my term 2 TP team's
election app where an election moves through draft -> scheduled -> live -> closed.

The biggest change being that saved books now persist in local storage instead of
dying on refresh and search runs on enter rather than keystroke. Also, books render
as spines on a bookcase with width proportional to page count.


# Getting Started

To run this application:

```bash
pnpm install
pnpm dev
```

# Building For Production

To build this application for production:

```bash
pnpm build
```

Built with React, TypeScript, Vite, Tailwind, shadcn/ui, TanStack Router and
Query and the Open Library API.

