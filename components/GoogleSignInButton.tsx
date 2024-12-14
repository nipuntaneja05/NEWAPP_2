// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// const GoogleSignInButton = () => {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: 'http://775307568343-1a9541h2rtidq0jtllcfntl3q07867p3.apps.googleusercontent.com',
//       offlineAccess: true, // if you want to access Google APIs on behalf of the user from your server
//     });
//   }, []);

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log(userInfo);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error(error.message);
//       } else {
//         console.error("An unknown error occurred");
//       }
//     }
//   };

//   return (
//     <View >
//       <TouchableOpacity style={styles.signInButton} onPress={signIn}>
//         <Text style={styles.buttonText}>Sign in with Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
  
//   signInButton: {
//     width: 250,
//     height: 50,
//     backgroundColor: '#ffffff', // White background
//     borderRadius: 25, // Half of the height to make it pill-shaped
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000', // Optional: Add a shadow for a raised look
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3, // For Android shadow
//   },
//   buttonText: {
//     color: '#4285F4', // Google Blue color for text
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default GoogleSignInButton;
