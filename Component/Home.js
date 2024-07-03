import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const IP_ADDRESS = '192.168.252.183'; // Replace with your backend IP address

const Home = () => {
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

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Loader.gif')}
        style={styles.logo}
      />
      <Text style={styles.adminName}>Managing books for {adminName}!</Text>
      <Text style={styles.operations}>Operations (Create, Read, Update, Delete) for books</Text>
      <Text style={styles.footerText}>Built by Sleman Qtawe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#004B49', // Dark green background color
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff', // White text color
  },
  operations: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // White text color
  },
  footerText: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    color: '#CCCCCC', // Light gray text color
  },
});

export default Home;
