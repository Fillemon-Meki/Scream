import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://192.168.178.90:5000/api/register', {
        name: name,
        email: email,
        password: password,
        role: 'user', // Set a default role or allow the user to select it in the registration form
      });

      // Handle successful registration, e.g., display success message
      console.log('Registration successful:', response.data);

      // Navigate to the login page
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering:', error.response.data.message);
      // Handle registration error, e.g., display error message
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.icon} />
      <Text style={styles.title}>Registration</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleRegistration} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER </Text>
      </TouchableOpacity>

      <Text style={styles.backToLogin} onPress={() => navigation.navigate('Login')}>
        Back to Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8e5f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#e9f7f7',
    borderWidth: 2,
    borderRadius: 50,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  backToLogin: {
    marginTop: 10,
    fontSize: 18,
    color: '#3E92CC',
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
