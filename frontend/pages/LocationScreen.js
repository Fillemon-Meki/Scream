import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const LocationScreen = () => {
  const [liveLocation, setLiveLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleTrackMe = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLiveLocation(true);
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 10 },
          (location) => setCurrentLocation(location.coords)
        );
      } else {
        Alert.alert(
          'Permission required',
          'Please grant permission to access your location.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={
            liveLocation && currentLocation
              ? {
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : undefined
          }
        >
          {liveLocation && currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="You are here"
            />
          )}
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={liveLocation ? 'STOP TRACKING' : 'TRACK ME'}
          onPress={handleTrackMe}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: '90%', // Adjust the width 
    height: '60%', // Adjust the height 
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 40,
    backgroundColor: '#EDEDEC',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3C71E1',
    
  },
});

export default LocationScreen;
