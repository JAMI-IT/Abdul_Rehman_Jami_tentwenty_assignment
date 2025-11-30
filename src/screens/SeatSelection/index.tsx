/**
 * Seat Selection Screen - Second Screen
 * Cinema seat selection interface - UI Only (Hard-coded data)
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import SeatMap, { Seat } from '@components/seat/SeatMap';
import SeatLegend from '@components/seat/SeatLegend';
import type { RootStackParamList } from '@navigation/types';

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

// Close Icon Component
const CloseIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M12 4L4 12M4 4L12 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Screen Curve SVG Component
const ScreenCurve: React.FC = () => (
  <View style={styles.screenContainer}>
    <Svg
      width="100%"
      height={50}
      viewBox="0 0 350 50"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        d="M 20 45 Q 175 5 330 45"
        stroke="#61C3F2"
        strokeWidth="2.5"
        fill="none"
      />
    </Svg>
    <Text style={styles.screenText}>SCREEN</Text>
  </View>
);

// Generate hard-coded seat data matching the EXACT design
const generateSeats = (): Seat[][] => {
  const rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const seatsPerRow = 12;

  return rows.map((row, rowIndex) => {
    return Array.from({ length: seatsPerRow }, (_, seatIndex) => {
      const seatNumber = seatIndex + 1;
      const isVip = rowIndex === 9; // Only row 10 is VIP (dark purple)

      // Exact unavailable seats from the image
      const unavailableSeats = [
        // Row 1
        '1-1',
        '1-2',
        '1-9',
        '1-10',
        '1-11',
        '1-12',
        // Row 2
        '2-5',
        '2-6',
        '2-9',
        '2-10',
        // Row 3
        '3-1',
        '3-9',
        '3-12',
        // Row 4
        '4-1',
        '4-2',
        '4-9',
        '4-10',
        '4-11',
        '4-12',
        // Row 5
        '5-3',
        '5-4',
        '5-9',
        '5-10',
        // Row 6
        '6-1',
        '6-9',
        '6-10',
        '6-11',
        '6-12',
        // Row 7
        '7-1',
        '7-2',
        '7-3',
        '7-4',
        '7-9',
        '7-10',
        // Row 8
        '8-1',
        '8-2',
        '8-9',
        '8-10',
        '8-11',
        '8-12',
        // Row 9
        '9-1',
        '9-2',
        '9-3',
        '9-4',
        '9-9',
        '9-10',
      ];

      const isUnavailable = unavailableSeats.includes(`${row}-${seatNumber}`);

      // Selected seat: row 3, seat 4 (the golden one in the image)
      const isSelected = row === '3' && seatNumber === 4;

      return {
        id: `${row}-${seatNumber}`,
        row,
        number: seatNumber,
        type: isUnavailable ? 'unavailable' : isVip ? 'vip' : 'regular',
        price: isVip ? 150 : 50,
        selected: isSelected,
      };
    });
  });
};

const SeatSelectionScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const movieTitle = "The King's Man";
  const selectedDate = new Date('2021-03-05');
  const selectedShowtime = '12:30';
  const selectedHall = 'Hall 1';
  const seatsState = generateSeats();
  const totalPrice = 50;

  const formatDate = (dateToFormat: Date): string => {
    return dateToFormat.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
          <Text style={styles.headerSubtitle}>
            {formatDate(selectedDate)} | {selectedShowtime} {selectedHall}
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Indicator */}
        <ScreenCurve />

        {/* Seat Map */}
        <View style={styles.seatMapSection}>
          <SeatMap seats={seatsState} onSeatPress={() => {}} maxSeats={8} />
        </View>

        {/* Separator line */}
        <View style={styles.separator} />

        {/* Legend */}
        <SeatLegend />

        {/* Selected Seat */}
        <View style={styles.selectedSeatContainer}>
          <View style={styles.selectedSeatTag}>
            <Text style={styles.selectedSeatText}>4 / 3 row</Text>
            <TouchableOpacity style={styles.removeButton} activeOpacity={0.7}>
              <CloseIcon color={colors.textTitleColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Total Price and Proceed Button */}
        <View style={styles.footerRow}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalAmount}>$ {totalPrice}</Text>
          </View>
          <TouchableOpacity style={styles.proceedButton} activeOpacity={0.8}>
            <Text style={styles.proceedButtonText}>Proceed to pay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
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
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: '#61C3F2',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  screenContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  screenText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#A0A0A0',
    letterSpacing: 3,
    marginTop: 8,
  },
  seatMapSection: {
    marginVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  selectedSeatContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  selectedSeatTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedSeatText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textTitleColor,
  },
  removeButton: {
    padding: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 12,
    gap: 16,
  },
  totalContainer: {
    flex: 0.4,
  },
  totalLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#6B6B6B',
    marginBottom: 4,
  },
  totalAmount: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.textPrimary,
  },
  proceedButton: {
    flex: 0.6,
    backgroundColor: colors.accentBlue,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
});

export default SeatSelectionScreen;
