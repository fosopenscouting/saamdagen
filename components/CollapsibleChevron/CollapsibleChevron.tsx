import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

interface Props {
  isActive: boolean;
}

const CollapsibleChevron: React.FC<Props> = (props: Props) => {
  const colorScheme = useColorScheme();

  return props.isActive ? (
    <MaterialCommunityIcons
      name="chevron-down"
      size={32}
      color={Colors[colorScheme].tabBarStyle.backgroundColor}
    />
  ) : (
    <MaterialCommunityIcons
      name="chevron-right"
      size={32}
      color={Colors[colorScheme].tabBarStyle.backgroundColor}
    />
  );
};

export default CollapsibleChevron;
