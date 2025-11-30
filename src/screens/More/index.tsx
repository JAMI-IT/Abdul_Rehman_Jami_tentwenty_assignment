/**
 * More Screen
 * Additional options and settings
 */

import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MoreScreen: React.FC = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>More</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xxl,
    color: colors.textPrimary,
  },
});

export default MoreScreen;
