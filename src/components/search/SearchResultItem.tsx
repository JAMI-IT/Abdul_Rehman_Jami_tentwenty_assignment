/**
 * Search Result Item Component
 * Displays a movie search result with thumbnail, title, and genre
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import type { Movie } from '@api/movieApi';

interface SearchResultItemProps {
  movie: Movie;
  onPress?: () => void;
}

// Three dots icon
const MoreIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 10.5C10.4142 10.5 10.75 10.1642 10.75 9.75C10.75 9.33579 10.4142 9 10 9C9.58579 9 9.25 9.33579 9.25 9.75C9.25 10.1642 9.58579 10.5 10 10.5Z"
      fill={color}
    />
    <Path
      d="M10 5.5C10.4142 5.5 10.75 5.16421 10.75 4.75C10.75 4.33579 10.4142 4 10 4C9.58579 4 9.25 4.33579 9.25 4.75C9.25 5.16421 9.58579 5.5 10 5.5Z"
      fill={color}
    />
    <Path
      d="M10 15.5C10.4142 15.5 10.75 15.1642 10.75 14.75C10.75 14.3358 10.4142 14 10 14C9.58579 14 9.25 14.3358 9.25 14.75C9.25 15.1642 9.58579 15.5 10 15.5Z"
      fill={color}
    />
  </Svg>
);

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  movie,
  onPress,
}) => {
  const imageUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;

  // Get genre from movie
  const getGenre = (genreIds?: number[]): string => {
    if (!genreIds || genreIds.length === 0) return 'Drama';
    const genreMap: Record<number, string> = {
      14: 'Fantasy',
      878: 'Sci-Fi',
      80: 'Crime',
      18: 'Drama',
      35: 'Comedy',
      27: 'Horror',
      10751: 'Family',
      99: 'Documentary',
      53: 'Thriller',
    };
    return genreMap[genreIds[0]] || 'Drama';
  };
  const genre = getGenre(movie.genre_ids);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.thumbnailContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.genre}>{genre}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
        <MoreIcon color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  thumbnailContainer: {
    marginRight: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
    resizeMode: 'cover',
  },
  placeholder: {
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
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.textPrimary,
    marginBottom: 6,
    lineHeight: 22,
  },
  genre: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  moreButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default SearchResultItem;
