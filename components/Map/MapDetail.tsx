import React from 'react';
import { View, HeaderText } from '../Themed';
import { StyleSheet } from 'react-native';

interface MapDetailProps {
  title: string;
  description: string;
}

const MapDetail: React.FC<MapDetailProps> = (props: MapDetailProps) => {
  return (
    <View style={styles.container}>
      <HeaderText style={styles.title}>{props.title}</HeaderText>
      <HeaderText>{props.description}</HeaderText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    fontFamily: 'AndesLight',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
});

export default MapDetail;
