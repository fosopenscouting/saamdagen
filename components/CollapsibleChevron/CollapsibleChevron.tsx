import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

interface Props {
  isActive: boolean;
}

const CollapsibleChevron: React.FC<Props> = (props: Props) => {
  return props.isActive ? (
    <MaterialCommunityIcons name="chevron-down" size={26} color="#000000" />
  ) : (
    <MaterialCommunityIcons name="chevron-right" size={26} color="#000000" />
  );
};

export default CollapsibleChevron;
