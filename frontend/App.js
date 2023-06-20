import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';
import HomeScreen from './pages/HomeScreen';
import LocationScreen from './pages/LocationScreen';
import ContactsScreen from './pages/ContactsScreen';
import CommunityScreen from './pages/CommunityScreen';
import SafetyTips from './pages/SafetyTips';
import AboutUs from './pages/AboutUs';

const Tab = createMaterialTopTabNavigator();


const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const renderScene = SceneMap({
    Home: HomeScreen,
    Location: LocationScreen,
    Contacts: ContactsScreen,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.settingsIcon}>
          <Icon name="settings-outline" size={24} color="#888" />
        </TouchableOpacity>
        <Text style={styles.logo}>Scream</Text>
        <Text style={styles.tagline}>Your Emergency Guardian</Text>
      </View>
<SafeAreaView>

      <Tab.Navigator tabBarOptions={{ labelStyle: { fontSize: 14 } }}>
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
   
      </SafeAreaView>
    </View>
  );
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <App />
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
    color: '#888',
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
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppContainer;
