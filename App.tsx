/**
 * Main App Component
 * Entry point of the application
 *
 * @format
 */

import React from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from '@navigation/AppNavigator';
import { colors } from '@theme/colors';
import { store } from '@store/index';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const activeEdges = Platform.OS === 'ios' ? ['top'] : ['top', 'bottom'];
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: colors.background }}
          edges={activeEdges}
        >
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={colors.primary}
          />
          <AppNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
