function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function toISO(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromISO(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function todayISO() {
  return toISO(new Date());
}

export function daysFromToday(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISO(d);
}

export function formatDate(iso: string) {
  return fromISO(iso).toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function daysBetween(a: string, b: string) {
  const ms = fromISO(b).getTime() - fromISO(a).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}
