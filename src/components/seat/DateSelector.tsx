/**
 * Date Selector Component
 * Horizontal scrollable date picker
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';

interface DateOption {
  date: Date;
  label: string;
}

interface DateSelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  // Hard-coded dates matching the design (March 5-9, 2021)
  const dates: DateOption[] = [
    { date: new Date('2021-03-05'), label: '5 Mar' },
    { date: new Date('2021-03-06'), label: '6 Mar' },
    { date: new Date('2021-03-07'), label: '7 Mar' },
    { date: new Date('2021-03-08'), label: '8 Mar' },
    { date: new Date('2021-03-09'), label: '9 Mar' },
  ];

  const isSelected = (date: Date): boolean => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((option, index) => {
          const selected = isSelected(option.date);
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dateButton, selected && styles.dateButtonSelected]}
              onPress={() => onDateSelect(option.date)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.dateText, selected && styles.dateTextSelected]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontFamily: fonts.primary,
    fontSize: fonts.sizes.md,
    color: colors.textTitleColor,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dateButton: {
    paddingHorizontal: 20,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
    marginRight: 12,
  },
  dateButtonSelected: {
    backgroundColor: colors.accentBlue,
    borderColor: colors.accentBlue,
  },
  dateText: {
    fontFamily: fonts.medium,
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
  },
  dateTextSelected: {
    color: colors.textLight,
  },
});

export default DateSelector;
