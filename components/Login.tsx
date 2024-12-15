import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the custom type for the decoded token
interface DecodedToken {
  user: {
    id: string; // Added userId to save in AsyncStorage
    name: string;
    email: string;
  };
}

const Login = () => {
  const [formType, setFormType] = useState<'SignUp' | 'Login' | null>(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    // Form validation
    if (formType === 'SignUp' && password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const endpoint = formType === 'SignUp' ? '/api/auth/register' : '/api/auth/signin';
      const response = await fetch(`https://requesto.in:8443${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formType === 'SignUp' ? name : undefined,
          email,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert(`${formType} successful!`);

        if (formType === 'Login') {
          await AsyncStorage.setItem('token', result.token);
          const decodedToken = jwtDecode<DecodedToken>(result.token);

          // Save userId, name, and email to AsyncStorage
          await AsyncStorage.setItem('userId', decodedToken.user.id);
          await AsyncStorage.setItem('name', decodedToken.user.name);
          await AsyncStorage.setItem('email', decodedToken.user.email);

          console.log('Stored in AsyncStorage:', {
            token: result.token,
            userId: decodedToken.user.id,
            name: decodedToken.user.name,
            email: decodedToken.user.email,
          });

          Alert.alert('Login details saved locally!');
        }

        // Reset input fields
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        console.error('Error response:', result);
        Alert.alert(result.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred while processing your request.');
    }
  };

  const handleFormSelect = (type: 'SignUp' | 'Login') => {
    setFormType(type);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Option</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleFormSelect('SignUp')}>
              <Text style={styles.optionText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleFormSelect('Login')}>
              <Text style={styles.optionText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {formType && (
        <>
          <Text style={styles.modalTitle}>{formType === 'SignUp' ? 'Sign Up' : 'Log In'}</Text>
          {formType === 'SignUp' && (
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {formType === 'SignUp' && (
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}
          <Button title="Submit" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Login;
