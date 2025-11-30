/**
 * Search Screen
 * Search movies with results display
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import SearchBar from '@components/search/SearchBar';
import CategoryCard from '@components/search/CategoryCard';
import SearchResultItem from '@components/search/SearchResultItem';
import type { RootStackParamList } from '@navigation/types';
import type { Movie } from '@api/movieApi';

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

// Mock category data - using gradient colors as placeholders
const categories = [
  { id: 1, name: 'Comedies', color: '#FFD700' },
  { id: 2, name: 'Crime', color: '#2C3E50' },
  { id: 3, name: 'Family', color: '#3498DB' },
  { id: 4, name: 'Documentaries', color: '#27AE60' },
  { id: 5, name: 'Dramas', color: '#9B59B6' },
  { id: 6, name: 'Fantasy', color: '#E74C3C' },
  { id: 7, name: 'Holidays', color: '#F39C12' },
  { id: 8, name: 'Horror', color: '#1A1A1A' },
  { id: 9, name: 'Sci-Fi', color: '#16A085' },
  { id: 10, name: 'Thriller', color: '#C0392B' },
];

// Mock search results data with actual TMDB movie IDs for images
const mockSearchResults: Movie[] = [
  {
    id: 667520,
    title: 'Timeless',
    poster_path: '/aVGDJXyHejx59x5u6w1vC2hz66.jpg',
    release_date: '2016-10-03',
    vote_average: 7.5,
    genre_ids: [14], // Fantasy
  } as Movie,
  {
    id: 49530,
    title: 'In Time',
    poster_path: '/3lG2j3ZegKib5z7gHxH17mDGE1I.jpg',
    release_date: '2011-10-28',
    vote_average: 6.7,
    genre_ids: [878], // Sci-Fi
  } as Movie,
  {
    id: 10483,
    title: 'A Time To Kill',
    poster_path: '/pVz3Tq1S41xswQ9Bpbhu3wz0w1m.jpg',
    release_date: '1996-07-24',
    vote_average: 7.3,
    genre_ids: [80], // Crime
  } as Movie,
  {
    id: 725273,
    title: 'Time',
    poster_path: '/7WJjFviFBffEJvkAmsVp8ZK52zU.jpg',
    release_date: '2020-10-02',
    vote_average: 6.8,
    genre_ids: [18], // Drama
  } as Movie,
  {
    id: 11631,
    title: 'Time Bandits',
    poster_path: '/7c9UVPPiTPlt2x7pcfTz1lJpwlq.jpg',
    release_date: '1981-07-13',
    vote_average: 6.9,
    genre_ids: [14, 878], // Fantasy, Sci-Fi
  } as Movie,
];

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter search results based on query
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length === 0) return [];
    const query = searchQuery.toLowerCase();
    return mockSearchResults.filter(movie =>
      movie.title.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const handleCategoryPress = (categoryName: string) => {
    // setSelectedCategory(categoryName);
  };

  const handleBackPress = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigation.goBack();
    }
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('Details', { movie });
  };

  const renderCategoryItem = ({ item }: { item: (typeof categories)[0] }) => (
    <CategoryCard
      name={item.name}
      color={item.color}
      onPress={() => handleCategoryPress(item.name)}
    />
  );

  const renderSearchResult = ({ item }: { item: Movie }) => (
    <SearchResultItem movie={item} onPress={() => handleMoviePress(item)} />
  );

  // Show category list view
  if (selectedCategory) {
    const moviesByCategory: Record<string, Movie[]> = {
      Comedies: [
        {
          id: 1,
          title: 'The Hangover',
          poster_path: '/thumb1.jpg',
          release_date: '2009-06-05',
          vote_average: 7.7,
        } as Movie,
        {
          id: 2,
          title: 'Superbad',
          poster_path: '/thumb2.jpg',
          release_date: '2007-08-17',
          vote_average: 7.6,
        } as Movie,
      ],
      Crime: [
        {
          id: 3,
          title: 'The Godfather',
          poster_path: '/thumb3.jpg',
          release_date: '1972-03-24',
          vote_average: 9.2,
        } as Movie,
        {
          id: 4,
          title: 'Pulp Fiction',
          poster_path: '/thumb4.jpg',
          release_date: '1994-10-14',
          vote_average: 8.9,
        } as Movie,
      ],
      Family: [
        {
          id: 5,
          title: 'Finding Nemo',
          poster_path: '/thumb5.jpg',
          release_date: '2003-05-30',
          vote_average: 8.2,
        } as Movie,
        {
          id: 6,
          title: 'Toy Story',
          poster_path: '/thumb6.jpg',
          release_date: '1995-11-22',
          vote_average: 8.3,
        } as Movie,
      ],
    };
    const movies = moviesByCategory[selectedCategory] || [];
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke={colors.textPrimary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedCategory}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieItem}
              onPress={() => navigation.navigate('Details', { movie: item })}
            >
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieDate}>{item.release_date}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.moviesList}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="TV shows, movies and more"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => {}}
        />
      </View>

      {/* Show search results or categories */}
      {searchQuery.trim().length > 0 ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Top Results</Text>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.categoriesGrid}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.silverGrey,
  },
  searchContainer: {
    backgroundColor: colors.white,
    paddingTop: 8,
    paddingBottom: 8,
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 8,
  },
  resultsTitle: {
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 0.6,
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.sm,
    color: colors.textPrimary,
    // paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
  },
  resultsList: {
    paddingBottom: 20,
  },
  categoriesGrid: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  moviesList: {
    padding: 16,
  },
  movieItem: {
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  movieTitle: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.md,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  movieDate: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
  },
});

export default SearchScreen;
