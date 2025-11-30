/**
 * Seat Legend Component
 * Shows seat type colors and meanings
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import SeatIcon from './SeatIcon';

interface LegendItem {
  color: string;
  label: string;
}

const SeatLegend: React.FC = () => {
  const legendItems: LegendItem[] = [
    {
      color: colors.seatSelected,
      label: 'Selected',
    },
    {
      color: colors.seatUnavailable,
      label: 'Not available',
    },
    {
      color: colors.seatVIP,
      label: 'VIP (150$)',
    },
    {
      color: colors.seatAvailable,
      label: 'Regular (50 $)',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* First Row - Selected and Not available */}
        <View style={styles.item}>
          <View
            style={[
              styles.colorBox,
              {
                backgroundColor: legendItems[0].color,
                borderColor: legendItems[0].color,
              },
            ]}
          >
            <SeatIcon color={legendItems[0].color} size={14} />
          </View>
          <Text style={styles.label}>{legendItems[0].label}</Text>
        </View>

        <View style={styles.item}>
          <View
            style={[
              styles.colorBox,
              {
                backgroundColor: legendItems[1].color,
                borderColor: legendItems[1].color,
              },
            ]}
          >
            <SeatIcon color={legendItems[1].color} size={14} />
          </View>
          <Text style={styles.label}>{legendItems[1].label}</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Second Row - VIP and Regular */}
        <View style={styles.item}>
          <View
            style={[
              styles.colorBox,
              {
                backgroundColor: legendItems[2].color,
                borderColor: legendItems[2].color,
              },
            ]}
          >
            <SeatIcon color={legendItems[2].color} size={14} />
          </View>
          <Text style={styles.label}>{legendItems[2].label}</Text>
        </View>

        <View style={styles.item}>
          <View
            style={[
              styles.colorBox,
              {
                backgroundColor: legendItems[3].color,
                borderColor: legendItems[3].color,
              },
            ]}
          >
            <SeatIcon color={legendItems[3].color} size={14} />
          </View>
          <Text style={styles.label}>{legendItems[3].label}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: '#6B6B6B',
    flex: 1,
  },
});

export default SeatLegend;
