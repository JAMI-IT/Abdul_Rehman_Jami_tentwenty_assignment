/**
 * Seat Icon Component
 * SVG icon for individual seats
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme/colors';

interface SeatIconProps {
  color: string;
  size?: number;
}

const SeatIcon: React.FC<SeatIconProps> = ({ color, size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 18V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.3"
      />
      <Path
        d="M4 16V8C4 6.9 4.9 6 6 6H8C9.1 6 10 6.9 10 8V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.3"
      />
      <Path
        d="M14 16V8C14 6.9 14.9 6 16 6H18C19.1 6 20 6.9 20 8V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.3"
      />
    </Svg>
  );
};

export default SeatIcon;
