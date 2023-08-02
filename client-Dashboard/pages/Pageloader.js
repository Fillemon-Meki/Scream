import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Pageloader = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate the loading process for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('HomeScreen');
    }, 3000); // 3 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#888" />
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {/* Add any content you want to display after the loading is complete */}
          <Text style={styles.content}>Page Loaded Successfully!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Pageloader;
