import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { fromISO, toISO, todayISO, daysFromToday } from "@/lib/dates";

const PRESETS = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "In 3 days", days: 3 },
  { label: "In a week", days: 7 },
  { label: "In 2 weeks", days: 14 },
];

type Props = {
  startDate?: string;
  onPick: (iso: string) => void;
};

export function SchedulePicker({ startDate, onPick }: Props) {
  const [month, setMonth] = useState<Date>(
    startDate ? fromISO(startDate) : new Date(),
  );

  function pick(iso: string) {
    onPick(iso);
    setMonth(fromISO(iso));
  }

  return (
    <div className="w-[280px] p-3">
      <Calendar
        mode="single"
        selected={startDate ? fromISO(startDate) : undefined}
        onSelect={(day) => day && pick(toISO(day))}
        month={month}
        onMonthChange={setMonth}
        disabled={{ before: fromISO(todayISO()) }}
        fixedWeeks
        className="p-0 [--cell-size:2rem]"
      />
      <div className="mt-3 flex flex-wrap gap-2 border-t pt-3">
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            size="sm"
            className="flex-1 basis-[calc(50%-0.25rem)] text-xs"
            onClick={() => pick(daysFromToday(preset.days))}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
