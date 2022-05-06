import React from 'react';
import { View, HeaderText } from '../Themed';
import { StyleSheet } from 'react-native';

interface MapDetailProps {
  title: string;
  description?: string;
}

const MapDetail: React.FC<MapDetailProps> = (props: MapDetailProps) => {
  return (
    <View style={styles.container}>
      <HeaderText style={styles.title}>{props.title}</HeaderText>
      {props.description ? <HeaderText>{props.description}</HeaderText> : null}
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
    fontFamily: 'Quicksand_300Light',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
});

export default MapDetail;
