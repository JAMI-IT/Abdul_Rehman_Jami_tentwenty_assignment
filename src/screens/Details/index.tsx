/**
 * Movie Details Screen
 * Displays detailed information about a selected movie
 */

import {
  useGetMovieDetailsQuery,
  useGetMovieImagesQuery,
  useGetMovieVideosQuery,
} from '@api/movieApi';
import Loader from '@components/common/Loader';
import type { RootStackParamList } from '@navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BANNER_HEIGHT = SCREEN_HEIGHT * 0.5;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const { movie } = route.params;

  const { data: movieDetails, isLoading: loadingDetails } =
    useGetMovieDetailsQuery(movie.id);

  const { data: videosData, isLoading: loadingVideos } = useGetMovieVideosQuery(
    movie.id,
  );

  const { data: imagesData } = useGetMovieImagesQuery(movie.id);

  const backdropImage =
    imagesData?.backdrops?.[0]?.file_path || movie.backdrop_path;
  const backdropUri = backdropImage
    ? `https://image.tmdb.org/t/p/w1280${backdropImage}`
    : null;

  const trailerVideo = videosData?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube',
  );

  const handleWatchTrailer = () => {
    if (trailerVideo) {
      navigation.navigate('Trailer', {
        videoKey: trailerVideo.key,
        movieTitle: movie.title,
      });
    }
  };

  const handleGetTickets = () => {
    // Navigate to seat selection
    navigation.navigate('Seat', {
      movie: movieDetails || movie,
      showtime: '12:30',
      date: movieDetails?.release_date || movie.release_date,
    });
  };

  const formatReleaseDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const genreColors = [
    colors.accentTeal,
    colors.accentPink,
    colors.primaryLight,
    colors.accentGold,
  ];

  if (loadingDetails) {
    return <Loader message="Loading movie details..." />;
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color={colors.textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Watch</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Movie Banner */}
      <View style={styles.bannerContainer}>
        {backdropUri ? (
          <Image
            source={{ uri: backdropUri }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.bannerImage, styles.placeholderBanner]} />
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
          style={styles.bannerGradient}
        />

        {/* Movie Title and Date */}
        <View style={styles.bannerContent}>
          <Text numberOfLines={2} style={styles.movieTitle}>
            {movieDetails?.title || movie.title}
          </Text>
          {movieDetails?.release_date && (
            <Text numberOfLines={2} style={styles.releaseDate}>
              In Theaters {formatReleaseDate(movieDetails.release_date)}
            </Text>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.getTicketsButton}
              onPress={handleGetTickets}
              activeOpacity={0.8}
            >
              <Text style={styles.getTicketsText}>Get Tickets</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.watchTrailerButton}
              onPress={handleWatchTrailer}
              activeOpacity={0.8}
              disabled={!trailerVideo || loadingVideos}
            >
              {loadingVideos ? (
                <ActivityIndicator color={colors.textLight} size="small" />
              ) : (
                <>
                  <Icon name="play-arrow" size={20} color={colors.textLight} />
                  <Text style={styles.watchTrailerText}>Watch Trailer</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Movie Details Section */}
      <View style={styles.detailsSection}>
        {/* Genres */}
        {movieDetails?.genres && movieDetails.genres.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Genres</Text>
            <View style={styles.genresContainer}>
              {movieDetails.genres.map((genre, index) => (
                <View
                  key={genre.id}
                  style={[
                    styles.genreTag,
                    {
                      backgroundColor: genreColors[index % genreColors.length],
                    },
                  ]}
                >
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>
            {movieDetails?.overview || movie.overview}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    gap: 10,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.textLight,
  },
  headerSpacer: {
    width: 32,
  },
  bannerContainer: {
    height: BANNER_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  placeholderBanner: {
    backgroundColor: colors.primary,
  },
  bannerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  bannerContent: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
  },
  movieTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.xxxl,
    color: colors.accentGold,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  releaseDate: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.md,
    color: colors.textLight,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  actionButtons: {
    // flexDirection: 'row',
    gap: 12,
    width: '80%',
    alignSelf: 'center',
  },
  getTicketsButton: {
    flex: 1,
    backgroundColor: colors.accentBlue,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getTicketsText: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.textLight,
  },
  watchTrailerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.textLight,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  watchTrailerText: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.textLight,
  },
  detailsSection: {
    backgroundColor: colors.background,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.primary,
    fontSize: fonts.sizes.md,
    color: colors.textTitleColor,
    marginBottom: 12,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    paddingHorizontal: 16,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  genreText: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.xs,
    color: colors.textLight,
  },
  overviewText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    color: colors.textGrey,
    lineHeight: fonts.sizes.md * 1.5,
  },
});

export default DetailsScreen;
