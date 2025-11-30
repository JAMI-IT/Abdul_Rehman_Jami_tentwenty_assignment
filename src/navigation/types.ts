/**
 * Navigation Types
 * Type definitions for React Navigation
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import type { Movie } from '@api/movieApi';

export type BottomTabParamList = {
  Dashboard: undefined;
  Watch: undefined;
  MediaLibrary: undefined;
  More: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  Details: { movie: Movie };
  Trailer: { videoKey: string; movieTitle: string };
  Seat: { movie: Movie; showtime: string; date: string };
  SeatSelection: { movie: Movie; showtime: string; date: string };
  Search: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
