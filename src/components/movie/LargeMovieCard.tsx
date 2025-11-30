/**
 * Large Movie Card Component
 * Full-width movie card with title overlay (for Watch screen)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import type { Movie } from '@api/movieApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_MARGIN = 16;

interface LargeMovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

const LargeMovieCard: React.FC<LargeMovieCardProps> = ({ movie, onPress }) => {
  // Construct image URL - paths from API already include leading slash
  const getImageUri = () => {
    if (movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    }
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    return null;
  };

  const imageUri = getImageUri();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={styles.card}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
            onError={error => {
              console.log('Image load error:', error.nativeEvent.error);
              console.log('Failed URL:', imageUri);
            }}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        {/* Gradient overlay for text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        />
        {/* Movie title overlay */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: CARD_MARGIN,
    marginBottom: 16,
  },
  card: {
    width: SCREEN_WIDTH - CARD_MARGIN * 2,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.backgroundSecondary,
  },
  image: {
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
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: colors.textLight,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

export default LargeMovieCard;

