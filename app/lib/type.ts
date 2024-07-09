import { SessionOptions } from "iron-session";

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: string;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    },
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    },
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    },
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieInfo = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: string;
  vote_average: number;
  vote_count: number;
};

export type MovieListing = {
  results: [];
};

export type ApiResponse = {
  error: boolean;
  message: string;
  data?: {
    page: number;
    results: MovieInfo[];
    total_pages: number;
    total_results: number;
  };
};

export type NextRequestQueryType = string | string[] | undefined;

export type TmdbResponseData = {
  success: string;
  status_code?: string;
  status_message?: string;
  expires_at?: string;
  request_token?: string;
};

export type CustomResponseData = {
  isError: boolean;
  message: string;
  data?: TmdbResponseData;
};

export type MreAuthentication = string | null;

export type TmdbUser = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

export type AuthData = {
  isLoggedIn: boolean;
  sessionId: string;
};

export type MovieVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type MovieVideos = {
  id: number;
  results: MovieVideo[];
};

export interface SessionData {
  sessionId?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: "tmdb-session",
  ttl: 3600,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
