/**
 * Movie Type Definitions
 */

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  popularity?: number;
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'vip' | 'unavailable';
  price: number;
  selected?: boolean;
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
  showtimes: Showtime[];
}

export interface Showtime {
  id: string;
  time: string;
  date: string;
  availableSeats: number;
}


