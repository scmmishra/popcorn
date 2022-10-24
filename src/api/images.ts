/**
 * Append the base image URL with the image path from the TMDB API
 *
 * @param  {string} path
 *
 * @returns string
 */
export default function buildPath(path: string): string {
  return `https://image.tmdb.org/t/p/w500/${path}`;
}
