/**
 * App Navigator
 * Main navigation configuration with bottom tabs
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import TabBarIcon from './TabBarIcon';
import type { BottomTabParamList } from './types';

// Import screens (placeholder components for now)
import DashboardScreen from '@screens/Dashboard';
import WatchScreen from '@screens/Watch';
import MediaLibraryScreen from '@screens/MediaLibrary';
import MoreScreen from '@screens/More';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.textLight,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon iconType="dashboard" focused={focused} />
            ),
            tabBarLabel: 'Dashboard',
          }}
        />
        <Tab.Screen
          name="Watch"
          component={WatchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon iconType="watch" focused={focused} />
            ),
            tabBarLabel: 'Watch',
          }}
        />
        <Tab.Screen
          name="MediaLibrary"
          component={MediaLibraryScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon iconType="library" focused={focused} />
            ),
            tabBarLabel: 'Media Library',
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon iconType="more" focused={focused} />
            ),
            tabBarLabel: 'More',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    height: 90,
    paddingBottom: 30,
    paddingTop: 10,
    borderRadius: 20,
    position: 'absolute',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabBarLabel: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.regular,
    marginTop: 2,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
});

export default AppNavigator;
