/**
 * Trailer Screen
 * Full-screen video player for movie trailers
 * Uses YouTube IFrame player for YouTube videos
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import type { RootStackParamList } from '@navigation/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type TrailerScreenRouteProp = RouteProp<RootStackParamList, 'Trailer'>;

const TrailerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<TrailerScreenRouteProp>();
  const { videoKey, movieTitle } = route.params;

  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleStateChange = (state: string) => {
    if (state === 'ended') {
      // Auto-close when video ends
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }
    if (state === 'playing') {
      setLoading(false);
    }
  };

  const handleDone = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar hidden />
      <View style={styles.container}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={SCREEN_HEIGHT}
            width={SCREEN_WIDTH}
            videoId={videoKey}
            play={playing}
            onChangeState={handleStateChange}
            onReady={() => setLoading(false)}
            onError={(error: string) => {
              console.log('YouTube player error:', error);
              setLoading(false);
            }}
            initialPlayerParams={{
              controls: 1,
              modestbranding: 1,
              rel: 0,
            }}
          />
        </View>

        {/* Done Button */}
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
          activeOpacity={0.8}
        >
          <Icon name="close" size={24} color={colors.textLight} />
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>

        {/* Movie Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {movieTitle}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  doneButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.textLight,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.xl,
    color: colors.textLight,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default TrailerScreen;
