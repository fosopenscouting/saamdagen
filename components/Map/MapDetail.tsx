import React from 'react';
import { View, HeaderText, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

interface MapDetailProps {
  title: string;
  description?: string;
}

const MapDetail: React.FC<MapDetailProps> = (props: MapDetailProps) => {
  return (
    <>
      <HeaderText style={styles.title}>{props.title}</HeaderText>
      {props.description ? (
        <BottomSheetScrollView>
          <View style={styles.scrollContainer}>
            <Text>{props.description}</Text>
          </View>
        </BottomSheetScrollView>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    fontFamily: 'Quicksand_300Light',
    textTransform: 'uppercase',
    textAlign: 'left',
    marginLeft: 10,
    marginBottom: 16,
  },
  scrollContainer: {
    marginBottom: 92,
    marginHorizontal: 10,
  },
});

export default MapDetail;
