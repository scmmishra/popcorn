export function formatDate(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}
