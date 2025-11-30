/**
 * Movie Item Component
 * Used in vertical lists (search results, etc.)
 */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import type { Movie } from '@api/movieApi';

interface MovieItemProps {
  movie: Movie;
  onPress?: () => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onPress }) => {
  const imageUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.posterContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        {movie.release_date && (
          <Text style={styles.date}>
            {new Date(movie.release_date).getFullYear()}
          </Text>
        )}
        {movie.vote_average > 0 && (
          <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.background,
    marginBottom: 12,
    borderRadius: 12,
  },
  posterContainer: {
    width: 80,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.backgroundSecondary,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  date: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rating: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.accentGold,
  },
});

export default MovieItem;
