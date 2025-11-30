/**
 * Tab Bar Icon Component
 * Custom icon component for bottom tab navigation using SVG icons
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import {
  DashboardIcon,
  WatchIcon,
  LibraryIcon,
  MoreIcon,
} from '@components/common/SvgIcon';
import DashboardIconSvg from '../assets/svg/bottomtab/dashboard.svg';
interface TabBarIconProps {
  iconType: 'dashboard' | 'watch' | 'library' | 'more';
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ iconType, focused }) => {
  const iconColor = focused ? colors.textLight : colors.textSecondary;
  const iconSize = 24;

  const renderIcon = () => {
    switch (iconType) {
      case 'dashboard':
        return <DashboardIcon color={iconColor} size={iconSize} />;
      case 'watch':
        return <WatchIcon color={iconColor} size={iconSize} />;
      case 'library':
        return <LibraryIcon color={iconColor} size={iconSize} />;
      case 'more':
        return <MoreIcon color={iconColor} size={iconSize} />;
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 4,
  },
});

export default TabBarIcon;
