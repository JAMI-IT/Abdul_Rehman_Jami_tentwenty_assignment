import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '56765746cffccf8b4d38814329917ebd';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  genre_ids?: number[];
  popularity?: number;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline?: string;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
}

export interface MovieImage {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

export interface MovieImagesResponse {
  backdrops: MovieImage[];
  posters: MovieImage[];
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),
  endpoints: builder => ({
    getUpcomingMovies: builder.query<{ results: Movie[] }, void>({
      query: () => `movie/upcoming?api_key=${API_KEY}`,
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: id => `movie/${id}?api_key=${API_KEY}`,
    }),
    getMovieVideos: builder.query<{ results: MovieVideo[] }, number>({
      query: id => `movie/${id}/videos?api_key=${API_KEY}`,
    }),
    getMovieImages: builder.query<MovieImagesResponse, number>({
      query: id => `movie/${id}/images?api_key=${API_KEY}`,
    }),
    searchMovies: builder.query<{ results: Movie[] }, string>({
      query: query => `search/movie?api_key=${API_KEY}&query=${query}`,
    }),
  }),
});

export const {
  useGetUpcomingMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieVideosQuery,
  useGetMovieImagesQuery,
  useSearchMoviesQuery,
} = tmdbApi;
