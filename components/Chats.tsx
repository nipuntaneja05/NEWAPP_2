import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Navbar from './Navbar';

const Alerts = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#ff7d5a', '#ffb649']} style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </LinearGradient>

      {/* Card */}
      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: 'https://path-to-your-image.com/image.png' }} // Replace with your image URL
          style={styles.image}
        />
        <Text style={styles.cardText}>Party Pack Deals</Text>
      </TouchableOpacity>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f1f8',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default Alerts;
