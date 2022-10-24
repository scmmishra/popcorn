import type { Movie, MovieListResponse } from "@/types/movies";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_READ_ACCESS_TOKEN;

/**
 * API wrapper to fetch from TMDB
 *
 * @param  {string} path
 * @param  {RequestInit} config
 * @returns Promise
 */
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const requestPath = `${API_URL}${path}`;
  const request = new Request(requestPath, {
    ...config,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  // error if there is no body, return empty array
  return response.json().catch(() => ({}));
}

/**
 * GET method around the TMDB wrapper
 *
 * @param  {string} path
 * @param  {RequestInit} config?
 * @returns Promise
 */
export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "GET", ...config };
  return await http<T>(path, init);
}

/**
 * Movie Service to fetch movies from TMDB API
 */
export class MovieService {
  /**
   * Fetch a single movie
   *
   * @param  {string} id
   * @returns Promise
   */
  async details(id: string): Promise<Movie> {
    return await get<Movie>(`/movie/${id}`);
  }

  /**
   * Fetch a paginated list of upcoming movies
   *
   * @param  {number=1} page
   * @returns Promise
   */
  async upcoming(page: number = 1): Promise<MovieListResponse> {
    return await get<MovieListResponse>(
      `/movie/upcoming?language=en-US&page=${page}`
    );
  }

  /**
   * Fetch a paginated list of top rated movies
   *
   * @param  {number=1} page
   * @returns Promise
   */
  async topRated(page: number = 1): Promise<MovieListResponse> {
    return await get<MovieListResponse>(
      `/movie/top_rated?language=en-US&page=${page}`
    );
  }
}
