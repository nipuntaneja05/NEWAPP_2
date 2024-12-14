import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';  // Import axios for making HTTP requests
import { RootStackParamList } from '../App';
import Navbar from './Navbar';

type HomepageNavigationProp = StackNavigationProp<RootStackParamList, 'Homepage'>;

const Homepage: React.FC = () => {
  const navigation = useNavigation<HomepageNavigationProp>();

  // Function to store the message in the database
  const storeMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/store', { message: 'hi' });
      console.log('Data stored successfully:', response.data);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content Container */}
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, Guest User</Text>
          <Text style={styles.subText}>Choose your preferred service or browse local offers</Text>
        </View>

        {/* Service Options */}
        <View style={styles.serviceOptions}>
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={() => navigation.navigate('RequestTemplate')}
          >
            <Image source={require('../assets/images/Requestvicinityimage.jpg')} style={styles.icon} />
            <Text style={styles.buttonText}>Request Vicinity</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={() => navigation.navigate('CabTemplate')} // Navigate to CabTemplate
          >
            <Image source={require('../assets/images/Cabimage.jpg')} style={styles.icon} />
            <Text style={styles.buttonText}>Share/Rent a Cab</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <Text style={styles.categoriesText}>Just explore our categories!</Text>
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton} onPress={storeMessage}>
            <Image source={require('../assets/images/Cabimage.jpg')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>RENTAL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Image source={require('../assets/images/Foodimage.jpg')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>FOOD</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navbar Section */}
      <Navbar />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBEFEF',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#FF9D45',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    fontSize: 14,
    color: '#fff',
  },
  serviceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9D45',
  },
  categoriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 100,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Homepage;
