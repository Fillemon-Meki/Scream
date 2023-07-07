import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const waveAnimation = useRef(new Animated.Value(1)).current;
  const [showSidebar, setShowSidebar] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLongPress, setIsLongPress] = useState(false);
  let longPressTimer;

  const navigation = useNavigation();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const startWaveAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startCountdown = () => {
    let countdownValue = 3;

    const countdownInterval = setInterval(() => {
      if (countdownValue > 1) {
        setCountdown(countdownValue);
        countdownValue -= 1;
      } else if (countdownValue === 1) {
        setCountdown('SCREAM');
        countdownValue -= 1;
      } else {
        clearInterval(countdownInterval);
        startWaveAnimation();
        // Perform action after countdown completes
        openContactsPage();
      }
    }, 1000);
  };

  const handleLongPress = () => {
    setIsLongPress(true);

    longPressTimer = setTimeout(() => {
      startCountdown();
    }, 3000);
  };

  const handlePressOut = () => {
    setIsLongPress(false);
    clearTimeout(longPressTimer);
  };

  const openContactsPage = () => {
    // Open contacts page using the navigation object
    navigation.navigate('Contacts');
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Modal visible={showSidebar} animationType="slide">
        <View style={styles.sidebarContainer}>
          {/* Sidebar content */}
          <TouchableOpacity onPress={toggleSidebar} style={styles.closeIcon}>
            <Icon name="close-outline" size={24} color="#888" />
          </TouchableOpacity>
          <Text style={styles.sidebarText}>Sidebar Content</Text>
        </View>
      </Modal>
      <View style={styles.hero}>
        <TouchableOpacity
          style={styles.callToActionButton}
          onPress={startCountdown}
          onLongPress={handleLongPress} // Initiate countdown on long press
          onPressOut={handlePressOut} // Reset long press state on release
          disabled={isLongPress || countdown !== 0} // Disable the button during countdown and long press
        >
          <Animated.Text style={[styles.callToActionButtonText, { transform: [{ scale: waveAnimation }] }]}>
            {countdown || 'SCREAM'}
          </Animated.Text>
        </TouchableOpacity>
      </View>

      {/* Cancel Button */}
      <View style={styles.cancelButton}>
        <TouchableOpacity>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Scream. All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
  },
  sidebarContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callToActionButton: {
    backgroundColor: '#3C71E1',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.6, // Adjust the width as needed
    height: width * 0.6, // Adjust the height as needed
    borderRadius: (width * 0.6) / 2, // To make it circular
    position: 'absolute',
  },
  callToActionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 40,
    backgroundColor: '#EDEDEC',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3C71E1',
    bottom: 40,
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
  },
});

export default HomeScreen;
