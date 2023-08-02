import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import HomeScreen from './pages/HomeScreen';
import LocationScreen from './pages/LocationScreen';
import ContactsScreen from './pages/ContactsScreen';
import CommunityScreen from './pages/CommunityScreen';
import SafetyTips from './pages/SafetyTips';
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/LoginPage'; 
import RegistrationScreen from './pages/RegistrationScreen';
import Pageloader from './pages/Pageloader'; 

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator(); // Create a Stack Navigator

const AppContainer = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Move the MainAppScreen content here
  const MainAppScreen = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar} style={styles.settingsIcon}>
            <Icon name="settings-outline" size={24} color="#888" />
          </TouchableOpacity>
          <Text style={styles.logo}>Scream</Text>
          <Text style={styles.tagline}>Your Emergency Guardian</Text>
        </View>
  
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarItemStyle: { width: 120 }, // Adjust the width of individual tabs as needed
            tabBarLabelStyle: { fontSize: 14 }, // Customize label styles
            indicatorStyle: { backgroundColor: 'blue' }, // Customize the indicator color
            tabBarStyle: { backgroundColor: 'white' }, // Customize the tab bar background color
            lazy: true, // Load screens lazily
            swipeEnabled: true, // Enable swipe between screens
          }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Location" component={LocationScreen} />
          <Tab.Screen name="Contacts" component={ContactsScreen} />
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Safety" component={SafetyTips} />
          <Tab.Screen name="AboutUs" component={AboutUs} />
        </Tab.Navigator>
  
        <Modal visible={showSidebar} animationType="slide">
          <View style={styles.sidebarContainer}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.closeIcon}>
              <Icon name="close-outline" size={24} color="#888" />
            </TouchableOpacity>
            <Text style={styles.sidebarText}>Sidebar Content</Text>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Set the LoginPage as the initial screen */}
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={MainAppScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pageloader" component={Pageloader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#EDEDEC',
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 10,
    padding: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fb5b5a',
  },
  tagline: {
    paddingBottom: 20,
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  sidebarContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeIcon: {
    position: 'absolute',
    top: 50,
    right: 10,
    padding: 10,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

export default AppContainer;
