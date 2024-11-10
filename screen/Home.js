import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const windowHeight = Dimensions.get("window").height;

// import { SearchModal } from '../components';
import { useAuth } from '../context/useAuth';
import { SearchModal, TripCard, UserModal } from '../components';

const Home = ({ navigation }) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Destino: Sede Norte del Cauca</Text>
        <TouchableOpacity onPress={() => setUserModalVisible(true)}>
          <Ionicons name="person-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TripCard
          location="Hospital piloto - Jamundí"
          time="14:00Hrs"
          seats={1}
          vehicleType="motorcycle"
        />

        <TripCard
          location="Jardin Plaza - Cali"
          time="10:00Hrs"
          seats={2}
          vehicleType="car"
        />
      </View>

      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />

      <UserModal
        visible={userModalVisible}
        onClose={() => setUserModalVisible(false)}
        onLogout={handleLogout}
        navigation={navigation}
      />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#003859',
    paddingTop: 0.07 * windowHeight,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 15,
  },
});