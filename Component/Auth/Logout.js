import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const IP_ADDRESS = '192.168.252.183'; // Replace with your backend IP address

const Logout = () => {
  const navigation = useNavigation();
  const [adminName, setAdminName] = useState('Admin Name');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:3000/admins`);
      if (response.data.length > 0) {
        setAdminName(response.data[0].username);
      }
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Logout.png')}
        style={styles.logo}
      />
      <Text style={styles.adminName}>Admin  {adminName}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#004B49', // White background color
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  adminName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:"#fff"
  },
  logoutButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#29AB87',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16,
  },
});

export default Logout;
