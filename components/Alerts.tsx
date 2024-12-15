import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert as RNAlert } from 'react-native'; // Renaming Alert to RNAlert
import LinearGradient from 'react-native-linear-gradient';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RequestAlert {
  _id: string;
  title: string;
  description: string;
  category: string;
  radius: number;
  waitTime: string;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  createdAt: string;
  email: string; // Request's email
}

const Alerts = () => {
  const [alerts, setAlerts] = useState<RequestAlert[]>([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoggedInUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email'); // Use the correct key for the email
        console.log('Logged in user email:', email);
        if (email) {
          setLoggedInUserEmail(email);
        } else {
          console.log('No email found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching logged-in user email:', error);
      }
    };

    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5000/api/requests/get');
        const data: RequestAlert[] = await response.json();
        setAlerts(data);
      } catch (err) {
        console.error('Error fetching alerts:', err);
      }
    };

    fetchLoggedInUserEmail();
    fetchAlerts();
  }, []);

  // Function to delete the user's request
  const deleteRequest = async (requestId: string) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/requests/delete/${requestId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAlerts(alerts.filter((alert) => alert._id !== requestId));
        RNAlert.alert('Success', 'Request deleted successfully');
      } else {
        RNAlert.alert('Error', 'Failed to delete the request');
      }
    } catch (error) {
      RNAlert.alert('Error', 'Failed to delete the request');
    }
  };

  // Function to apply for a request
  const applyRequest = async (requestId: string) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/requests/${requestId}`, {
        method: 'POST',
      });

      if (response.ok) {
        RNAlert.alert('Success', 'You have successfully applied for this request');
      } else {
        RNAlert.alert('Error', 'Failed to apply for the request');
      }
    } catch (error) {
      RNAlert.alert('Error', 'Failed to apply for the request');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#ff7d5a', '#ffb649']} style={styles.header}>
        <Text style={styles.headerText}>Requests</Text>
      </LinearGradient>

      {/* Alerts */}
      <ScrollView style={styles.scrollView}>
        {alerts.map((alert) => (
          <View key={alert._id} style={styles.card}>
            <Text style={styles.cardTitle}>{alert.title}</Text>
            <Text style={styles.cardText}>Description: {alert.description}</Text>
            <Text style={styles.cardText}>Category: {alert.category}</Text>
            <Text style={styles.cardText}>Radius: {alert.radius} meters</Text>
            <Text style={styles.cardText}>Wait Time: {alert.waitTime}</Text>
            <Text style={styles.cardText}>
              Region: Lat {alert.region.latitude}, Lng {alert.region.longitude}
            </Text>
            <Text style={styles.cardText}>
              Created At: {new Date(alert.createdAt).toLocaleString()}
            </Text>

            {/* Buttons: Apply or Delete */}
            {alert.email === loggedInUserEmail ? (
              // Show 'Delete' button for user's own request
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => deleteRequest(alert._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            ) : (
              // Show 'Apply' button for others' requests
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => applyRequest(alert._id)}
              >
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    backgroundColor: '#ff7d5a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Alerts;
