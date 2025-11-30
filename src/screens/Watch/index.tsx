/**
 * Watch Screen
 * Main watch/browse screen - matches design with large movie cards
 * Fetches upcoming movies from TMDB API
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import LargeMovieCard from '@components/movie/LargeMovieCard';
import Loader from '@components/common/Loader';
import { useGetUpcomingMoviesQuery } from '@api/movieApi';
import type { Movie } from '@api/movieApi';

const WatchScreen: React.FC = () => {
  const { data, isLoading, isFetching, error, refetch } =
    useGetUpcomingMoviesQuery();

  const movies: Movie[] = data?.results || [];
  const loading = isLoading;
  const refreshing = isFetching;

  const handleRefresh = () => {
    refetch();
  };

  const handleMoviePress = (movie: Movie) => {
    // Navigate to details screen
    console.log('Movie pressed:', movie.title);
    // TODO: Navigate to Details screen
    // navigation.navigate('Details', { movie });
  };

  const handleSearchPress = () => {
    // Navigate to search screen
    console.log('Search pressed');
    // TODO: Navigate to Search screen
  };

  const renderMovieItem: ListRenderItem<Movie> = ({ item }) => (
    <LargeMovieCard movie={item} onPress={() => handleMoviePress(item)} />
  );

  if (loading && movies.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Loader message="Loading upcoming movies..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Failed to load movies. Please try again.
          </Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Watch</Text>
        <TouchableOpacity
          onPress={handleSearchPress}
          style={styles.searchButton}
          activeOpacity={0.7}
        >
          <Icon name="search" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Movie Cards List */}
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accentBlue}
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No movies found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontFamily: fonts.primary,
    fontSize: fonts.sizes.lg,
    color: colors.textTitleColor,
  },
  searchButton: {
    padding: 4,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 120, // Space for bottom tab bar
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.accentBlue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.textLight,
  },
});

export default WatchScreen;
