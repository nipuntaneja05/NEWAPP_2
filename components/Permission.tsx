import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

const Permission = () => {
  const [showLocationPage, setShowLocationPage] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const requestLocationPermission = async () => {
    console.log('Requesting location permission...');
    try {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (hasPermission) {
        console.log('Permission already granted');
        Alert.alert('Permission granted');
        navigation.navigate('Homepage');
        return;
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission granted', 'You can now access location');
        navigation.navigate('Homepage');
      } else {
        Alert.alert('Permission denied', 'You need to enable location permission');
      }
    } catch (err) {
      console.error('Permission request failed:', err);
    }
  };

  return (
    <View style={styles.container}>
      {showLocationPage ? (
        <>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowLocationPage(false)}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Image
            source={require('../assets/images/LocationImage.jpg')}
            style={styles.image}
          />
          <Text style={styles.title}>Enable Location</Text>
          <Text style={styles.description}>
            The app uses your location to provide you with offers and pools available
            within your vicinity for the best experience.
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={requestLocationPermission}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Permissions</Text>
          <Text style={styles.description}>
            Allow us location and notification permission.
          </Text>
          <Text style={styles.note}>
            The only reason we need this is to keep you updated about offers and pools
            happening near you!
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestLocationPermission}
          >
            <Text style={styles.permissionText}>📍 Location Access</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.permissionButton}>
            <Text style={styles.permissionText}>🔔 Notification Access</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => setShowLocationPage(true)}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#000',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  note: {
    fontSize: 14,
    color: '#8c52ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA5A5',
    borderWidth: 1,
    borderColor: '#8c52ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    marginVertical: 5,
  },
  permissionText: {
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#8c52ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  continueText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Permission;
