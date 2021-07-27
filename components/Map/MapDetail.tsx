import React from 'react';
import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';

interface MapDetailProps {
  title: string;
  description: string;
}

const MapDetail: React.FC<MapDetailProps> = (props: MapDetailProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MapDetail;
