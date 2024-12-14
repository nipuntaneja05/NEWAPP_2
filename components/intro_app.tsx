import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
// import GoogleSignInButton from './GoogleSignInButton';

const { width, height } = Dimensions.get('window');

const IntroApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const skipToFinalPage = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: (4 - 1) * width, animated: true });
      setCurrentPage(4);
    }
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {[1, 2, 3, 4].map((_, index) => {
        const dotOpacity = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        const dotScale = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                opacity: dotOpacity,
                transform: [{ scale: dotScale }],
              },
            ]}
          />
        );
      })}
    </View>
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        {renderDots()}
        {currentPage < 4 && (
          <TouchableOpacity onPress={skipToFinalPage}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        onMomentumScrollEnd={(event) => {
          const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width) + 1;
          setCurrentPage(pageIndex);
        }}
      >
        {[1, 2, 3].map((page) => (
          <View style={styles.pageContainer} key={page}>
            <Image
              source={require('../assets/images/imageintro1.png')}
              style={styles.image}
            />
          </View>
        ))}
        <View style={styles.pageContainer} key={4}>
          <Image
            source={require('../assets/images/Loginimage.jpg')}
            style={styles.loginImage}
          />
          <Text style={styles.loginTitle}>Login</Text>
          <Text style={styles.loginSubtitle}>
            Ready to save? Login and pool offers!
          </Text>
          {/* <GoogleSignInButton /> */}
          <Text></Text>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.socialButtonText}>Continue with Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Permission')}>
            <Text style={styles.guestText}>Continue as guest</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            By continuing, you agree to the Terms and Conditions, Refund Policy and Privacy Policy.
          </Text>
        </View>
      </Animated.ScrollView>
      <View style={styles.getStartedContainer}>
        {currentPage < 4 && (
          <TouchableOpacity
            onPress={skipToFinalPage}
            style={styles.getStartedButton}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'purple',
    marginHorizontal: 5,
  },
  pageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 1.0,
    height: height * 0.8,
    resizeMode: 'cover',
  },
  loginImage: {
    width: width * 0.6,
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 20,
    textAlign: 'center',
  },
  socialButton: {
    width: width * 0.8,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#000',
  },
  guestText: {
    fontSize: 14,
    color: 'blue',
    marginVertical: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 10,
  },
  getStartedContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#8c52ff',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#8c52ff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    elevation: 5,
  },
});



export default IntroApp;
