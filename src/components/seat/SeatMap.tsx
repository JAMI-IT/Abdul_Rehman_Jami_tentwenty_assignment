/**
 * Seat Map Component
 * Interactive seat selection map
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import SeatIcon from './SeatIcon';

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'vip' | 'unavailable';
  price: number;
  selected?: boolean;
}

interface SeatMapProps {
  seats: Seat[][];
  onSeatPress: (seat: Seat) => void;
  maxSeats?: number;
}

// Plus Icon
const PlusIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 4V16M4 10H16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Minus Icon
const MinusIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M4 10H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  onSeatPress,
  maxSeats = 8,
}) => {
  const [zoom, setZoom] = useState(1);

  const getSeatColor = (seat: Seat): string => {
    if (seat.selected) return colors.seatSelected;
    if (seat.type === 'unavailable') return colors.seatUnavailable;
    if (seat.type === 'vip') return colors.seatVIP;
    return colors.seatAvailable;
  };

  return (
    <View style={styles.container}>
      <View style={styles.seatMapWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.seatMapContainer}
        >
          <View style={[styles.seatMap, { transform: [{ scale: zoom }] }]}>
            {/* Row Numbers */}
            <View style={styles.rowNumbers}>
              {seats.map((row, index) => (
                <View key={index} style={styles.rowNumberContainer}>
                  <Text style={styles.rowNumberText}>{index + 1}</Text>
                </View>
              ))}
            </View>

            {/* Seats Grid */}
            <View style={styles.seatsGrid}>
              {seats.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {/* First section: seats 1-4 */}
                  <View style={styles.section}>
                    {row.slice(0, 4).map(seat => (
                      <TouchableOpacity
                        key={seat.id}
                        style={[
                          styles.seat,
                          {
                            backgroundColor: getSeatColor(seat),
                            borderColor: getSeatColor(seat),
                          },
                        ]}
                        onPress={() => {
                          if (seat.type !== 'unavailable') {
                            onSeatPress(seat);
                          }
                        }}
                        disabled={seat.type === 'unavailable'}
                        activeOpacity={0.7}
                      >
                        <SeatIcon color={getSeatColor(seat)} size={14} />
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Aisle */}
                  <View style={styles.aisle} />

                  {/* Second section: seats 5-8 */}
                  <View style={styles.section}>
                    {row.slice(4, 8).map(seat => (
                      <TouchableOpacity
                        key={seat.id}
                        style={[
                          styles.seat,
                          {
                            backgroundColor: getSeatColor(seat),
                            borderColor: getSeatColor(seat),
                          },
                        ]}
                        onPress={() => {
                          if (seat.type !== 'unavailable') {
                            onSeatPress(seat);
                          }
                        }}
                        disabled={seat.type === 'unavailable'}
                        activeOpacity={0.7}
                      >
                        <SeatIcon color={getSeatColor(seat)} size={14} />
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Aisle */}
                  <View style={styles.aisle} />

                  {/* Third section: seats 9-12 */}
                  <View style={styles.section}>
                    {row.slice(8, 12).map(seat => (
                      <TouchableOpacity
                        key={seat.id}
                        style={[
                          styles.seat,
                          {
                            backgroundColor: getSeatColor(seat),
                            borderColor: getSeatColor(seat),
                          },
                        ]}
                        onPress={() => {
                          if (seat.type !== 'unavailable') {
                            onSeatPress(seat);
                          }
                        }}
                        disabled={seat.type === 'unavailable'}
                        activeOpacity={0.7}
                      >
                        <SeatIcon color={getSeatColor(seat)} size={14} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Zoom Controls - Positioned OUTSIDE and BELOW the seat map */}
        <View style={styles.zoomControls}>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() => setZoom(prev => Math.min(prev + 0.1, 2))}
            activeOpacity={0.7}
          >
            <PlusIcon color="#1C1C1C" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
            activeOpacity={0.7}
          >
            <MinusIcon color="#1C1C1C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  seatMapWrapper: {
    position: 'relative',
  },
  seatMapContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    paddingBottom: 60, // Space for zoom controls
  },
  seatMap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowNumbers: {
    marginRight: 12,
    paddingTop: 2,
  },
  rowNumberContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  rowNumberText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#8E8E93',
  },
  seatsGrid: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  section: {
    flexDirection: 'row',
    gap: 6,
  },
  aisle: {
    width: 14,
  },
  seat: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomControls: {
    position: 'absolute',
    right: 30,
    bottom: 8,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'transparent',
  },
  zoomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
});

export default SeatMap;
