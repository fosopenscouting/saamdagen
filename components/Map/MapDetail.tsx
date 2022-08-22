import React from 'react';
import { View, HeaderText } from '../Themed';
import { StyleSheet, ScrollView } from 'react-native';
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";


interface MapDetailProps {
  title: string;
  description?: string;
}

const MapDetail: React.FC<MapDetailProps> = (props: MapDetailProps) => {
  if (props.description)
  {
    return (<>
        <HeaderText style={styles.title}>{props.title}</HeaderText>
        <BottomSheetScrollView
            stickyHeaderIndices={[0]}>
          <HeaderText></HeaderText>
          <HeaderText>{props.description}</HeaderText>
        </BottomSheetScrollView>
        </>
    );
  }
  else
  {
    return (
      <View style={styles.container}>
        <HeaderText style={styles.title}>{props.title}</HeaderText>
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
    flex: 1
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
