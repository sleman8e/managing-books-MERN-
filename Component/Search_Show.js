import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Animated, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Update from './Update';
import Add from './Add';

const IP_ADDRESS = '192.168.252.183';

const Search_Show = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:3000/books`);
      setData(response.data);
      setLoading(false);
      console.log("Data fetched successfully");
    } catch (err) {
      console.error('Failed to fetch data', err);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
    setIsAdding(false);
    animateModal(true);
  };

  const handleAddClick = () => {
    setShowModal(true);
    setIsAdding(true);
    animateModal(true);
  };

  const handleCancelModal = () => {
    animateModal(false, () => {
      setShowModal(false);
      setSelectedBook(null);
      setIsAdding(false);
    });
  };

  const handleSaveUpdate = async (updatedBook) => {
    try {
      await axios.put(`http://${IP_ADDRESS}:3000/books/${updatedBook._id}`, updatedBook);
      await fetchData();
      handleCancelModal();
    } catch (err) {
      console.error('Failed to save update', err);
      Alert.alert('Error', 'Failed to save update. Please try again later.');
    }
  };

  const handleSaveAdd = async (newBook) => {
    try {
      await axios.post(`http://${IP_ADDRESS}:3000/books`, newBook);
      await fetchData();
      handleCancelModal();
    } catch (err) {
      console.error('Failed to save new book', err);
      Alert.alert('Error', 'Failed to save new book. Please try again later.');
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://${IP_ADDRESS}:3000/books/${id}`);
      await fetchData();
    } catch (err) {
      console.error('Failed to remove item', err);
      Alert.alert('Error', 'Failed to remove item. Please try again later.');
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const animateModal = (show, callback = () => {}) => {
    const toValue = show ? 1 : 0;
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  const filteredData = data.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search by title'
            placeholderTextColor='#fff'
            value={searchQuery}
            onChangeText={handleSearchChange}
            color="#fff"
          />
        </View>
        <TouchableOpacity onPress={handleAddClick} style={styles.addButton}>
          <Icon name="add-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#007bff" />
      ) : (
        <View style={styles.dataContainer}>
          {filteredData.map((item) => (
            <View style={styles.itemContainer} key={item._id}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Title: {item.title}</Text>
                <Text style={styles.author}>Author: {item.author}</Text>
                <Text style={styles.price}>Price: ${item.price}</Text>
                <Text style={styles.language}>Language: {item.language}</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleUpdateClick(item)} style={styles.iconButton}>
                  <Icon name="edit" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeItem(item._id)} style={styles.iconButton}>
                  <Icon name="delete" size={24} color="#ff0000" />
                </TouchableOpacity>
                
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={showModal}
        onRequestClose={handleCancelModal}
      >
        <TouchableWithoutFeedback onPress={handleCancelModal}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
              {isAdding ? (
                <Add onCancel={handleCancelModal} onSave={handleSaveAdd} />
              ) : (
                <Update book={selectedBook} onCancel={handleCancelModal} onSave={handleSaveUpdate} />
              )}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#004B49',
    paddingVertical: 70,
    paddingHorizontal: 10,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 3,
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#1A2421',
    color: 'white',
  }
,  
  addButton: {
    padding: 10,
  },
  dataContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#29AB87',
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1A2421',
  },
  author: {
    fontSize: 14,
    marginBottom: 5,
    color:"#1A2421"
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
    color: '#1A2421', 
  },
  language: {
    fontSize: 14,
    marginBottom: 5,
     color:"#1A2421"
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '75%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginTop:-180,
  
  },
});

export default Search_Show;
