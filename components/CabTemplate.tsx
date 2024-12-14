// CabTemplate.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CabTemplate = () => {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/Cabimage.jpg')} style={styles.image} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Create your Share!</Text>
      <Text style={styles.subtitle}>Enter your ride details</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Pick Up Location"
        placeholderTextColor="#C7C7CD"
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        placeholderTextColor="#C7C7CD"
      />

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} disabled>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F7F7F',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginVertical: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  nextButton: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#C7C7CD',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default CabTemplate;
