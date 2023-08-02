// frontend/LocationScreen.js

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Button, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import io from "socket.io-client";

const { width, height } = Dimensions.get("window");

const LocationScreen = () => {
  const [liveLocation, setLiveLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server on the backend
    const newSocket = io("http://your-backend-server-address");
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleTrackMe = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLiveLocation(true);

        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 10 },
          (location) => {
            setCurrentLocation(location.coords);

            // Send the live location update to the backend via WebSocket
            if (socket) {
              socket.emit("location-update", {
                userId: "user123", // Replace with the user's unique identifier (e.g., user ID)
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
            }
          }
        );
      } else {
        Alert.alert(
          "Permission required",
          "Please grant permission to access your location.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.log("Error requesting location permission:", error);
    }
  };

  useEffect(() => {
    // Listen for location updates from the server and update other users' live locations on the map
    if (socket) {
      socket.on("location-update", (locationData) => {
        // Update the live location of other users on the map based on the received data (userId, latitude, longitude)
        // Replace this with your logic to update the markers on the map
      });
    }
  }, [socket]);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -22.562695611931407,
            longitude: 17.070598281752922,
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
          title={liveLocation ? "STOP TRACKING" : "TRACK ME"}
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
    width: "90%",
    height: "70%",
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 40,
    backgroundColor: "#EDEDEC",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#3C71E1",
  },
});

export default LocationScreen;
