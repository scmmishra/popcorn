/**
 * Format date to MMM YYYY
 * example: December 1974
 *
 * @param  {string} date
 */
export function formatDate(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}
