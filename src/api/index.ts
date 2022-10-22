import type { Movie, MovieListResponse } from "@/types/movies";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_READ_ACCESS_TOKEN;

async function http<T>(path: string, config: RequestInit): Promise<T> {
  console.log(API_KEY, API_URL);
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

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "GET", ...config };
  return await http<T>(path, init);
}

export class MovieService {
  async details(id: string): Promise<Movie> {
    return await get<Movie>(`/movie/${id}`);
  }

  async upcoming(): Promise<MovieListResponse> {
    const body = new URLSearchParams();
    body.append("page", "1");
    body.append("region", "IN");
    body.append("language", "en-US");
    return await get<MovieListResponse>("/movie/upcoming", {});
  }

  async latest(): Promise<Movie[]> {
    return await get<Movie[]>("/movie/latest");
  }

  async popular(): Promise<MovieListResponse> {
    return await get<MovieListResponse>("/movie/popular");
  }

  async topRated(): Promise<MovieListResponse> {
    return await get<MovieListResponse>("/movie/top_rated");
  }
}