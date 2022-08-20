import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { View } from '../Themed';

export const ActivityFooter: React.FC = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.eventSeparator,
        { borderBottomColor: Colors[colorScheme].headerColor },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  eventSeparator: {
    borderBottomWidth: 2,
    marginTop: 5,
    marginBottom: 5,
  },
});
