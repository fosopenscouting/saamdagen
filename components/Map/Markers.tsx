import React from 'react';
import { MapMarker } from '../../models/MapMarker';
import { Text, View } from '../Themed';
import { Marker } from 'react-native-maps';
import { markerImages } from '../../constants/ImageMap';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

type MarkerProps = {
  markers: MapMarker[];
  handleMarkerSelect: (e: string) => void;
};
const Markers: React.FC<MarkerProps> = (props: MarkerProps) => {
  return (
    <>
      {props.markers?.map((item) => (
        <Marker
          onPress={(e) => {
            e.stopPropagation();
            props.handleMarkerSelect(e.nativeEvent.id as string);
          }}
          key={item.id}
          coordinate={item.latLng}
          identifier={item.title}
          icon={markerImages[item.icon as keyof typeof markerImages]}
        >
          {item.icon ? null : (
            <View style={styles.markerContainer}>
              <Text>{item.id}</Text>
            </View>
          )}
        </Marker>
      ))}
    </>
  );
};

export default Markers;

const styles = StyleSheet.create({
  markerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: Colors.schemeIndependent.fosBlue,
    borderRadius: 8,
  },
});
