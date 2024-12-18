import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert as RNAlert,
  TouchableOpacity,  // For the button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

interface Applicant {
  email: string;
}

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);

  const route = useRoute();
  const { requestId } = route.params as { requestId: string };

  useEffect(() => {
    const fetchLoggedInUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setLoggedInUserEmail(email);
        }
      } catch (error) {
        console.error('Error fetching logged-in user email:', error);
      }
    };

    const fetchApplicants = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5000/api/requests/applicants/${requestId}`);
        const data = await response.json();
        console.log('Applicants Data:', data); // Log the received data

        if (response.ok) {
          setApplicants(data); // Set applicants directly from the data received
        } else {
          RNAlert.alert('Error', 'Failed to fetch applicants.');
        }
      } catch (err) {
        console.error('Error fetching applicants:', err);
        RNAlert.alert('Error', 'Failed to fetch applicants.');
      }
    };

    console.log('Received requestId:', requestId);
    fetchLoggedInUserEmail();
    fetchApplicants();
  }, [requestId]);

  useEffect(() => {
    console.log('Applicants state updated:', applicants); // Debugging applicants state
  }, [applicants]);

  const handleChatPress = (email: string) => {
    // Implement your chat navigation or logic here
    console.log('Chat with:', email);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#ff7d5a', '#ffb649']} style={styles.header}>
        <Text style={styles.headerText}>Applicants</Text>
      </LinearGradient>

      {/* Applicants List */}
      <ScrollView style={styles.scrollView}>
        {applicants.length === 0 ? (
          <Text style={styles.noApplicantsText}>No applicants yet.</Text>
        ) : (
          applicants.map((applicant, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>Email: {applicant.email}</Text>
              
              {/* Chat Button */}
              <TouchableOpacity 
                style={styles.chatButton} 
                onPress={() => handleChatPress(applicant.email)}
              >
                <Text style={styles.chatButtonText}>Chat</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f1f8',
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
    scrollView: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 10,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      flexDirection: 'row', // Keep horizontal alignment for email and button
      justifyContent: 'flex-start', // Align email and button to the left
      alignItems: 'center', // Center the button vertically with the email text
      flexWrap: 'wrap', // Ensure content wraps in case it exceeds screen width
    },
    cardText: {
      fontSize: 16,
      color: '#333',
      flex: 1, // Take up available space for email text
    },
    chatButton: {
      backgroundColor: '#ff7d5a',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 5,
      marginLeft: 10, // Add space between email and button
      alignSelf: 'flex-start', // Align button to the left of the screen
    },
    chatButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    noApplicantsText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  

export default ViewApplicants;
