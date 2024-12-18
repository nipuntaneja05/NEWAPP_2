import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert as RNAlert,
} from 'react-native'; // Renaming Alert to RNAlert
import LinearGradient from 'react-native-linear-gradient';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App'; // Import RootStackParamList

// Define navigation type
type NavigationProps = StackNavigationProp<RootStackParamList, 'Alerts'>;

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
  const navigation = useNavigation<NavigationProps>();
  const [alerts, setAlerts] = useState<RequestAlert[]>([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);
  const [appliedRequests, setAppliedRequests] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchLoggedInUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
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
      const response = await fetch(`http://10.0.2.2:5000/api/requests/${requestId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loggedInUserEmail }),
      });

      if (response.ok) {
        setAlerts(alerts.filter((alert) => alert._id !== requestId));
        RNAlert.alert('Success', 'Request deleted successfully');
      } else {
        RNAlert.alert('Error', 'Failed to delete the request');
      }
    } catch (error) {
      RNAlert.alert('Error', 'Failed to delete the request');
      console.error('Error deleting request:', error);
    }
  };

  // Function to apply for a request
  const applyRequest = async (requestId: string) => {
    try {
      if (!loggedInUserEmail) {
        RNAlert.alert('Error', 'You must be logged in to apply for requests');
        return;
      }

      const response = await fetch(`http://10.0.2.2:5000/api/requests/apply/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loggedInUserEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setAppliedRequests((prev) => new Set(prev).add(requestId));
        RNAlert.alert('Success', data.message || 'Successfully applied for the request.');
      } else {
        RNAlert.alert('Error', data.message || 'Failed to apply for the request.');
      }
    } catch (error) {
      RNAlert.alert('Error', 'An unexpected error occurred while applying for the request.');
      console.error('Error applying for request:', error);
    }
  };

  // Function to navigate to 'ViewApplicants' and pass the requestId
  const viewApplicants = (requestId: string) => {
    navigation.navigate('ViewApplicants', { requestId }); // Pass the requestId to ViewApplicants screen
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

            {/* Buttons */}
            {alert.email === loggedInUserEmail ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.viewButton]}
                  onPress={() => viewApplicants(alert._id)} // Pass requestId
                >
                  <Text style={styles.buttonText}>View Applicants</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => deleteRequest(alert._id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </>
            ) : appliedRequests.has(alert._id) ? (
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => RNAlert.alert('Chat', 'Navigate to chat screen')}
              >
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
            ) : (
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
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  scrollView: {
    padding: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: '#ff7d5a',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
  },
  applyButton: {
    backgroundColor: '#7ed957',
  },
});

export default Alerts;
