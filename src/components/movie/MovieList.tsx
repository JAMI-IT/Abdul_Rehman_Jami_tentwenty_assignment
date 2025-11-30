/**
 * Movie List Component
 * Horizontal scrolling list of movies
 */

import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import MovieCard from '@components/common/MovieCard';
import type { Movie } from '@types/movie';

interface MovieListProps {
  movies: Movie[];
  title?: string;
  onMoviePress?: (movie: Movie) => void;
  horizontal?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  title,
  onMoviePress,
  horizontal = true,
}) => {
  const renderMovie: ListRenderItem<Movie> = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => onMoviePress?.(item)}
      width={120}
      height={180}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={item => item.id.toString()}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default MovieList;

