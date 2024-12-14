import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Navbar from './Navbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Adjust the import if App.tsx is in a different directory
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

// Define the navigation prop type for Profile screen
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const Profile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // Use the defined navigation type

  const [isFeedbackVisible, setFeedbackVisible] = useState(false);
  const [isContactVisible, setContactVisible] = useState(false);
  const [isEditProfileVisible, setEditProfileVisible] = useState(false); // State for Edit Profile Modal

  const openFeedbackForm = () => setFeedbackVisible(true);
  const closeFeedbackForm = () => setFeedbackVisible(false);
  const openContactForm = () => setContactVisible(true);
  const closeContactForm = () => setContactVisible(false);
  const openEditProfile = () => setEditProfileVisible(true); // Open Edit Profile Modal
  const closeEditProfile = () => setEditProfileVisible(false); // Close Edit Profile Modal

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");
    // You may want to navigate to the login screen or clear user session data
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profileText}>Profile</Text>
        <Icon name="account-circle" size={50} color="#FFFFFF" />
      </View>

      <View style={styles.userIconContainer}>
        <Icon name="account-circle" size={80} color="#555" />
        <Text style={styles.guestText}>GUEST USER</Text>
      </View>

      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <ProfileButton title="Feedback Form" icon="feedback" onPress={openFeedbackForm} />
        <ProfileButton title="App Guide" icon="menu-book" onPress={() => navigation.navigate('IntroApp')} />

        <ProfileButton title="Permissions" icon="location-on" onPress={() => navigation.navigate('Permission')} />
       
        <ProfileButton title="Edit Profile" icon="edit" onPress={openEditProfile} />
        <ProfileButton title="Contact Us" icon="email" onPress={openContactForm} />
        <ProfileButton title="About Us" icon="info" onPress={() => {}} />
        <ProfileButton title="Logout" icon="info" onPress={() => {}} />
        <ProfileButton title="Logout" icon="info" onPress={() => {}} />
        {/* <ProfileButton title="Logout" icon="logout" onPress={handleLogout} /> */}
      </ScrollView>

      <Navbar />

      {/* Feedback Form Modal */}
      <Modal visible={isFeedbackVisible} transparent animationType="slide">
  <View style={styles.modalBackground}>
    <View style={styles.feedbackContainer}>
      <Text style={styles.feedbackTitle}>Your Feedback is incredibly valuable to us.</Text>
      <Text style={styles.feedbackSubtitle}>Help us improve the app!</Text>
      <TextInput
        style={styles.feedbackInput}
        placeholder="Enter your Feedback..."
        placeholderTextColor="#888"
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={closeFeedbackForm}>
        <Text style={styles.submitButtonText}>Submit Form</Text>
      </TouchableOpacity>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton1} onPress={closeFeedbackForm}>
        <Text style={styles.closeButtonText1}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      {/* Contact Form Modal */}
      <Modal visible={isContactVisible} transparent animationType="slide">
  <View style={styles.modalBackground}>
    <View style={styles.contactContainer}>
      <Text style={styles.contactTitle}>Do not hesitate to contact us if you face any issues!</Text>
      <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('mailto:applyatrequesto@gmail.com')}>
        <Icon name="email" size={24} color="#FFA500" />
        <Text style={styles.contactText}>applyatrequesto@gmail.com</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('tel:+918824014907')}>
        <Icon name="phone" size={24} color="#FFA500" />
        <Text style={styles.contactText}>+91 8824014907</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('https://www.instagram.com/requesto.in/')}>
        <Icon name="instagram" size={24} color="#FFA500" />
        <Text style={styles.contactText}>Instagram: @requesto.in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={closeContactForm}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      {/* Edit Profile Modal */}
      <Modal visible={isEditProfileVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.editProfileContainer}>
            <Text style={styles.editProfileTitle}>Edit your information here!</Text>
            <Icon name="account-circle" size={80} color="#555" style={styles.profileIcon} />
            <TouchableOpacity style={styles.inputContainer}>
              <Icon name="person" size={24} color="#FFA500" />
              <Text style={styles.inputText}>Astrix</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputContainer}>
              <Icon name="phone" size={24} color="#FFA500" />
              <Text style={styles.inputText}>Add Phone Number</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>DELETE MY ACCOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeEditProfile}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

interface ProfileButtonProps {
  title: string;
  icon: string;
  onPress: () => void;
}

const ProfileButton = ({ title, icon, onPress }: ProfileButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Icon name={icon} size={24} color="#FFA500" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#FFA500" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFA500',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userIconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  guestText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFA500',
    marginVertical: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  feedbackContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  feedbackSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  feedbackInput: {
    width: '100%',
    height: 100,
    borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#CCC',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  contactContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  editProfileContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  editProfileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  inputText: {
    fontSize: 16,
    marginLeft: 10,
  },
  deleteButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF0000',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  closeButton1: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FF6347', // You can choose any color
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Space between the submit button and close button
  },
  closeButtonText1: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  
});

export default Profile;
