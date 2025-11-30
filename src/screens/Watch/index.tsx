/**
 * Watch Screen
 * Main watch/browse screen - matches design with large movie cards
 * Fetches upcoming movies from TMDB API
 */

import type { Movie } from '@api/movieApi';
import { useGetUpcomingMoviesQuery } from '@api/movieApi';
import Loader from '@components/common/Loader';
import LargeMovieCard from '@components/movie/LargeMovieCard';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type WatchScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const WatchScreen: React.FC = () => {
  const navigation = useNavigation<WatchScreenNavigationProp>();
  const { data, isLoading, isFetching, error, refetch } =
    useGetUpcomingMoviesQuery();

  const movies: Movie[] = data?.results || [];
  const loading = isLoading;
  const refreshing = isFetching;

  const handleRefresh = () => {
    refetch();
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('Details', { movie });
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const renderMovieItem: ListRenderItem<Movie> = ({ item }) => (
    <LargeMovieCard movie={item} onPress={() => handleMoviePress(item)} />
  );

  if (loading && movies.length === 0) {
    return (
      <View style={styles.container} edges={['top']}>
        <Loader message="Loading upcoming movies..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Failed to load movies. Please try again.
          </Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.silverGrey,
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
