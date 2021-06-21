import React from 'react';
import { View } from '../components/Themed';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = () => {

    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    )
}

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
