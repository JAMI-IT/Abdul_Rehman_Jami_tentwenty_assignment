/**
 * Media Library Screen
 * User's saved media library
 */

import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MediaLibraryScreen: React.FC = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Media Library</Text>
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

export default MediaLibraryScreen;
