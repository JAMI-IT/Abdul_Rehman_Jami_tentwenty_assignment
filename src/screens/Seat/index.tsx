/**
 * Seat Selection Screen - First Screen (Showtime Selection)
 * Cinema showtime booking interface - UI Only (Hard-coded data)
 */

import DateSelector from '@components/seat/DateSelector';
import ShowtimeCard from '@components/seat/ShowtimeCard';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

type SeatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Seat'>;

// Back Arrow Icon Component
const BackArrowIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SeatScreen: React.FC = () => {
  const navigation = useNavigation<SeatScreenNavigationProp>();

  // Hard-coded data matching the design
  const movieTitle = "The King's Man";
  const releaseDate = 'In Theaters December 22, 2021';
  const selectedDate = new Date('2021-03-05'); // March 5, 2021

  const showtimes = [
    {
      time: '12:30',
      hall: 'Cinetech + Hall 1',
      price: '50$',
      bonus: '2500',
      selected: true,
    },
    {
      time: '13:30',
      hall: 'Cinetech',
      price: '75$',
      bonus: '3000',
      selected: false,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <BackArrowIcon color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{movieTitle}</Text>
          <Text style={styles.headerSubtitle}>{releaseDate}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Selector */}
        <DateSelector selectedDate={selectedDate} onDateSelect={() => {}} />

        {/* Showtime Cards */}
        <View style={styles.showtimesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.showtimesContainer}
          >
            {showtimes.map((showtimeOption, index) => (
              <ShowtimeCard
                key={index}
                time={showtimeOption.time}
                hall={showtimeOption.hall}
                price={showtimeOption.price}
                bonus={showtimeOption.bonus}
                selected={showtimeOption.selected}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      {/* Select Seats Button */}
      <View style={styles.selectSeatsContainer}>
        <TouchableOpacity
          style={styles.selectSeatsButton}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('SeatSelection', {
              movie: {
                id: 0,
                title: "The King's Man",
                release_date: '2021-12-22',
              } as any,
              showtime: '12:30',
              date: '2021-03-05',
            });
          }}
        >
          <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  backButton: {
    padding: 4,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.accentBlue,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  showtimesSection: {
    marginTop: 24,
    marginBottom: 24,
    height: '100%',
  },
  showtimesContainer: {
    paddingHorizontal: 16,
  },
  selectSeatsContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  selectSeatsButton: {
    backgroundColor: colors.accentBlue,
    // paddingVertical: 10,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  selectSeatsButtonText: {
    fontFamily: fonts.primary,
    fontWeight: '600',
    fontSize: fonts.sizes.sm,
    color: colors.textLight,
  },
});

export default SeatScreen;
