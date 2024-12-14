import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EmailPopup = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.description}>
        Please enter your email address to continue.
      </Text>
      {/* Add your form or email input UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default EmailPopup;
