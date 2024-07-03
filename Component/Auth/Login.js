import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IP_ADDRESS = '192.168.252.183'; // Replace with your backend IP address

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:3000/admins`);
      AsyncStorage.setItem('admins', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to fetch data', error);
      Alert.alert('Error', 'Failed to fetch admin data. Please try again later.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:3000/admins`);
      const foundAdmin = response.data.find(admin => admin.username === username && admin.password === password);
      if (foundAdmin) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.navigate('Main');
      } else {
        setLoginMessage('You are not authorized. Please check your credentials.');
      }
    } catch (error) {
      console.error('Failed to verify credentials', error);
      Alert.alert('Error', 'Failed to verify credentials. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
    >
      <View style={styles.inner}>
        <Image
          source={require('../../assets/login.png')} // Replace with your image path
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor='#fff'
          value={username}
          onChangeText={text => setUsername(text)}
          autoCapitalize="none"
          onFocus={() => setLoginMessage('')} // Clear login message on input focus
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor='#fff'
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          onFocus={() => setLoginMessage('')} // Clear login message on input focus
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {loginMessage ? <Text style={styles.loginMessage}>{loginMessage}</Text> : null}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Built by Sleman Qtawe</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004B49', // White background color
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20, // Added padding to accommodate the footer
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCCCCC', // Light gray border color
    backgroundColor: '#1A2421', // White background for input fields
    color: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#29AB87', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
  },
  loginMessage: {
    color: 'red',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: '#CCCCCC', // Light gray text color
    fontSize: 12,
  },
});

export default Login;
