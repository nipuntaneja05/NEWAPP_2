import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RequestTemplate = () => {
  const [isPreferencesView, setIsPreferencesView] = useState(false); // Toggle between views
  const [radius, setRadius] = useState(200); // Radius in meters
  const [waitTime, setWaitTime] = useState("15 mins");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [title, setTitle] = useState('dzxc'); // Request Title
  const [description, setDescription] = useState('xzc'); 
  const [category, setCategory] = useState('Others'); // Category

  const handleStart = async () => {
    // Ensure all fields are filled out
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
  
    try {
      // Fetch email and userId from AsyncStorage
      const email = await AsyncStorage.getItem('email'); // Replace 'email' with the actual key where email is stored
      const userId = await AsyncStorage.getItem('userId'); // Replace 'userId' with the actual key where userId is stored
  
      if (email && userId) {
        const requestData = {
          title: title.trim(),
          description: description.trim(),
          category: category.trim(),
          radius,
          waitTime,
          region,
          email, // Add email to the requestData
          userId, // Add userId to the requestData
        };
  
        // Fetch JWT token
        const token = await AsyncStorage.getItem('jwt_token'); // Replace with your method of fetching token
  
        const response = await fetch('http://10.0.2.2:5000/api/requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send the JWT token in the Authorization header
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Request saved:', data);
          setIsPreferencesView(true); // Switch to Preferences view
        } else {
          Alert.alert('Error', 'Failed to save request');
        }
      } else {
        Alert.alert('Error', 'User email or user ID not found');
      }
    } catch (error) {
      console.error('Error saving request:', error);
      Alert.alert('Error', 'An error occurred while saving the request');
    }
  };
  
  
  const handleBackPress = () => {
    if (isPreferencesView) {
      setIsPreferencesView(false); // Go back to form view
    }
  };

  const handleNextPress = () => {
    setIsPreferencesView(true); // Switch to preferences view when Next is clicked
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </Pressable>

      {/* Conditional rendering based on view */}
      {isPreferencesView ? (
        // Pooling Preferences View
        <>
          <View style={styles.mapContainer}>
            <MapView
              style={StyleSheet.absoluteFillObject}
              region={region}
              onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            >
              <Marker coordinate={region} />
              <Circle
                center={region}
                radius={radius}
                strokeColor="rgba(255, 165, 0, 0.8)"
                fillColor="rgba(255, 165, 0, 0.3)"
              />
            </MapView>
          </View>

          <Text style={styles.title}>Set your Preferences</Text>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceBox}>
              <Text style={styles.preferenceLabel}>Radius</Text>
              <Text style={styles.preferenceValue}>{radius} mts</Text>
            </View>
            <View style={styles.preferenceBox}>
              <Text style={styles.preferenceLabel}>Wait Time</Text>
              <Text style={styles.preferenceValue}>{waitTime}</Text>
            </View>
          </View>

          <Text style={styles.poolingText}>Pooling with 0 users</Text>

          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Start Pooling</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Request Form View
        <>
          <Text style={styles.title}>Request Vicinity</Text>
          <Text style={styles.subtitle}>
            Connect with people in your vicinity to pool anything and everything!
          </Text>

          <TouchableOpacity style={styles.pictureButton}>
            <Icon name="photo-camera" size={24} color="white" />
            <Text style={styles.pictureButtonText}>Click a picture (Optional)</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Enter Request Title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Describe your Request"
            placeholderTextColor="#999"
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            placeholderTextColor="#999"
            value={category}
            onChangeText={setCategory}
          />

          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  pictureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6600',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  pictureButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF6600',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#f0f0f0', // Placeholder color for the map area
    borderRadius: 8,
    marginBottom: 20,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  preferenceBox: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FF6600',
    borderRadius: 8,
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  preferenceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  poolingText: {
    fontSize: 16,
    color: '#FF6600',
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default RequestTemplate;
