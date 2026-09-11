import type { ShelfBook } from "@/lib/shelf";
import { todayISO } from "@/lib/dates";

const COLOURS = ["#fdd130", "#fa9303", "#f75610", "#da1e30", "#b11250"];
const LIGHT_COLOURS = ["#fdd130", "#fa9303"];

function idNumber(id: string) {
    let total = 0;
    for (const char of id) total += char.charCodeAt(0);
    return total;
}

type Props = {
    book: ShelfBook;
    index: number;
    selected: boolean;
    onClick: () => void;
};

export function Spine({ book, index, selected, onClick }: Props) {
    const n = idNumber(book.id);
    const colour = COLOURS[index % COLOURS.length];
    const textColour = LIGHT_COLOURS.includes(colour) ? "text-[#2a1a0a]" : "text-white/90";
    const height = 140 + (n % 30);
    const width = Math.min(48, Math.max(22, (book.pageCount ?? 200) / 10));

    const isDue =
        book.status === "scheduled" &&
        book.startDate !== undefined &&
        book.startDate <= todayISO();

    const lift = selected ? "-translate-y-3" : "hover:-translate-y-2";

    return (
        <button
            onClick={onClick}
            title={`${book.title} · ${book.author}`}
            className={`relative flex shrink-0 items-center justify-center rounded-t-sm shadow-md transition-transform ${lift}`}
            style={{ width, height, background: colour }}
        >
            {isDue && (
                <span
                    title="Start date has passed"
                    className="absolute -top-1 right-1 h-2.5 w-2.5 rounded-full bg-amber-300 ring-2 ring-[#0d1b3e]"
                />
            )}
            <span className={`max-h-[85%] truncate text-xs ${textColour} [writing-mode:vertical-rl]`}>
                {book.title}
            </span>
        </button>
    );
}