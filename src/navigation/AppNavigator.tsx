/**
 * App Navigator
 * Main navigation configuration with bottom tabs
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import TabBarIcon from './TabBarIcon';
import type { BottomTabParamList, RootStackParamList } from './types';

// Import screens
import DashboardScreen from '@screens/Dashboard';
import WatchScreen from '@screens/Watch';
import MediaLibraryScreen from '@screens/MediaLibrary';
import MoreScreen from '@screens/More';
import DetailsScreen from '@screens/Details';
import TrailerScreen from '@screens/Trailer';
import SeatScreen from '@screens/Seat';
import SeatSelectionScreen from '@screens/SeatSelection';
import SearchScreen from '@screens/Search';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
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
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            presentation: 'card',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen
          name="Trailer"
          component={TrailerScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen
          name="Seat"
          component={SeatScreen}
          options={{
            presentation: 'card',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen
          name="SeatSelection"
          component={SeatSelectionScreen}
          options={{
            presentation: 'card',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            presentation: 'card',
            animationTypeForReplace: 'push',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 30,
    paddingTop: 3,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
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
