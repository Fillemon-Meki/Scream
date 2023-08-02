import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        We are a community-driven platform dedicated to promoting safety and well-being in our neighborhoods. Our mission is to provide resources and information to help individuals stay safe and informed.
      </Text>
      <Text style={styles.subTitle}>Key Features:</Text>
      <View style={styles.featureContainer}>
        <Text style={styles.featureText}>
          - Safety Tips: Access a comprehensive list of safety tips to help you navigate your surroundings confidently.
        </Text>
        <Text style={styles.featureText}>
          - Community Page: Connect with fellow community members, share posts, and stay updated on local news and events.
        </Text>
        <Text style={styles.featureText}>
          - Emergency Contacts: Easily access important emergency contact numbers such as local law enforcement and helplines.
        </Text>
        <Text style={styles.featureText}>
          - Safety Videos: Watch informative safety videos on various topics to enhance your knowledge and awareness.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureContainer: {
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AboutUs;
