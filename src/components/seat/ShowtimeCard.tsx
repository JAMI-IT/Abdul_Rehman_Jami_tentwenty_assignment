/**
 * Showtime Card Component
 * Card displaying showtime with mini seat map
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import SeatIcon from './SeatIcon';
import { bookingimg } from '@assets/images';

interface ShowtimeCardProps {
  time: string;
  hall: string;
  price: string;
  bonus?: string;
  selected?: boolean;
  onPress: () => void;
  seatPreview?: Array<{ type: 'regular' | 'vip' | 'unavailable' }>;
}

const ShowtimeCard: React.FC<ShowtimeCardProps> = ({
  time,
  hall,
  price,
  bonus,
  selected = false,
  onPress,
  seatPreview,
}) => {
  // Hard-coded mini seat preview matching design
  const defaultPreview: Array<{ type: 'regular' | 'vip' | 'unavailable' }> = [
    'regular',
    'regular',
    'regular',
    'regular',
    'unavailable',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'unavailable',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
    'regular',
  ].map(type => ({ type: type as 'regular' | 'vip' | 'unavailable' }));

  const preview = seatPreview || defaultPreview;

  const getSeatColor = (type: string): string => {
    switch (type) {
      case 'vip':
        return colors.seatVIP;
      case 'unavailable':
        return colors.seatUnavailable;
      default:
        return colors.seatAvailable;
    }
  };

  return (
    <View style={{ gap: 5, height: 300 }}>
      <View style={styles.header}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.hall}>{hall}</Text>
      </View>
      <TouchableOpacity
        style={[styles.card, selected && styles.cardSelected]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Image
          resizeMode="contain"
          source={bookingimg}
          style={{ height: '80%', width: '100%' }}
        />
      </TouchableOpacity>
      <Text style={styles.price}>
        From <Text style={styles.priceBold}>{price}</Text>
        {bonus && ` or `}
        {bonus && <Text style={styles.priceBold}>{bonus} bonus</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    height: '50%', // alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected: {
    borderColor: colors.accentBlue,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  time: {
    fontFamily: fonts.primary,
    fontSize: fonts.sizes.xs,
    color: colors.textTitleColor,
  },
  hall: {
    fontFamily: fonts.primary,
    fontSize: fonts.sizes.xs,
    color: colors.textGrey,
  },
  seatPreviewContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  seatPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.accentBlue,
    backgroundColor: colors.background,
    width: '100%',
    justifyContent: 'center',
  },
  miniSeat: {
    width: 8,
    height: 8,
    borderRadius: 2,
    borderWidth: 0.5,
  },
  price: {
    fontFamily: fonts.primary,
    fontSize: fonts.sizes.xs,
    color: colors.textTitleColor,
  },
  priceBold: {
    fontFamily: fonts.bold,
    // fontSize: fonts.sizes.sm,
    // color: colors.textPrimary,
  },
});

export default ShowtimeCard;
