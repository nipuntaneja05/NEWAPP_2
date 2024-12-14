import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

interface TabButtonProps {
  label: string;
  iconName: string;
  isActive: boolean;
  onPress: () => void;
}

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  // Update activeTab based on the current route name
  useEffect(() => {
    setActiveTab(route.name.toLowerCase());
  }, [route.name]);

  const TabButton: React.FC<TabButtonProps> = ({ label, iconName, isActive, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Ionicons
        name={isActive ? iconName : `${iconName}-outline`}
        size={28}
        color={isActive ? '#f89e46' : '#333333'}
        style={styles.icon}
      />
      <Text style={[styles.tabLabel, { color: isActive ? '#f89e46' : '#333333' }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TabButton
        label="Home"
        iconName="home"
        isActive={activeTab === 'home'}
        onPress={() => navigation.navigate('Homepage')}
      />
      <TabButton
        label="Alerts"
        iconName="notifications"
        isActive={activeTab === 'alerts'}
        onPress={() => navigation.navigate('Alerts')}
      />
      <TabButton
        label="Chats"
        iconName="chatbubbles"
        isActive={activeTab === 'chats'}
        onPress={() => navigation.navigate('Chats')}
      />
      <TabButton
        label="Profile"
        iconName="person"
        isActive={activeTab === 'profile'}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#f6f1fa',
    paddingVertical: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tabButton: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default Navbar;
