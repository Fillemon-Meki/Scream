import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ContactsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <View style={styles.contactContainer}>
        <View style={styles.iconContainer}>
          <Icon name="shield" size={20} color="#888888" style={styles.icon} />
        </View>
        <Text style={styles.contactName}>Police</Text>
        <Text style={styles.contactNumber}>10 111</Text>
      </View>
      <View style={styles.contactContainer}>
        <View style={styles.iconContainer}>
          <Icon name="person" size={20} color="#888888" style={styles.icon} />
        </View>
        <Text style={styles.contactName}>Michael</Text>
        <Text style={styles.contactNumber}>123-456-7890</Text>
      </View>
      <View style={styles.contactContainer}>
        <View style={styles.iconContainer}>
          <Icon name="person" size={20} color="#888888" style={styles.icon} />
        </View>
        <Text style={styles.contactName}>Second Michael</Text>
        <Text style={styles.contactNumber}>987-654-3210</Text>
      </View>
      <View style={styles.contactContainer}>
        <View style={styles.iconContainer}>
          <Icon name="person" size={20} color="#888888" style={styles.icon} />
        </View>
        <Text style={styles.contactName}>Third Michael</Text>
        <Text style={styles.contactNumber}>987-654-3210</Text>
      </View>
      <View style={styles.contactContainer}>
        <View style={styles.iconContainer}>
          <Icon name="person" size={20} color="#888888" style={styles.icon} />
        </View>
        <Text style={styles.contactName}>Fourth Michael</Text>
        <Text style={styles.contactNumber}>987-654-3210</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
    color: '#888888',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#888888',
  },
});

export default ContactsScreen;
