import React from 'react';
import { Text } from '../Themed/Text';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import useColorScheme from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';

const ActivityLocation: React.FC<{
  location: string | undefined;
}> = ({ location }) => {
  const colorScheme = useColorScheme();

  if (!location) return null;

  return (
    <Text>
      &ensp;-{' '}
      <MaterialDesignIcons
        color={Colors[colorScheme].muted}
        name="map-marker"
      />{' '}
      {location}
    </Text>
  );
};

export default ActivityLocation;
