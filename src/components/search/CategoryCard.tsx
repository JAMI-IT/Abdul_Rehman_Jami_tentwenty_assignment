/**
 * Category Card Component
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';

interface CategoryCardProps {
  name: string;
  color: string;
  onPress?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[color, `${color}CC`, `${color}99`]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 1.2,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.textLight,
  },
});

export default CategoryCard;
