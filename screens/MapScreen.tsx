import React from 'react';
import { View } from '../components/Themed';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen: React.FC = () => {
  const mapRegion: Region = {
    latitude: 51.200977,
    longitude: 4.850671,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const onMapReady = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        region={mapRegion}
        showsUserLocation={true}
        minZoomLevel={16}
        showsMyLocationButton
        onMapReady={onMapReady}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
