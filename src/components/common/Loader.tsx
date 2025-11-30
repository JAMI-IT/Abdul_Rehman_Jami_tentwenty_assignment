/**
 * Loader Component
 * Loading indicator
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = colors.accentBlue,
  message,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
  },
});

export default Loader;
