/**
 * Movie Card Component
 * Displays movie poster with title
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import type { Movie } from '@types/movie';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
  width?: number;
  height?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  width = 120,
  height = 180,
}) => {
  const imageUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <TouchableOpacity
      style={[styles.container, { width }]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={[styles.posterContainer, { height, width }]}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={[styles.poster, { height, width }]}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholder, { height, width }]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      {movie.title && (
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  posterContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.backgroundSecondary,
  },
  poster: {
    borderRadius: 12,
  },
  placeholder: {
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  placeholderText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.textPrimary,
    marginTop: 8,
    textAlign: 'left',
  },
});

export default MovieCard;

