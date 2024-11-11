import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useAuth } from '../context/useAuth';
import { SearchModal, UserModal } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { windowHeight } from '../utils/Dimenstios';
import { useNavigation } from '@react-navigation/native';



const DriverHome = () => {
  const navigation = useNavigation();
  const [userModalVisible, setUserModalVisible] = useState(false);

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [hasTrips] = useState(false); // Este estado lo podrías manejar con la data real de los viajes
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const handleCreateRoute = () => {
    // Aquí irá la navegación a la pantalla de crear ruta
    navigation.navigate('createTrip');
  };

  const renderContent = () => {
    if (!hasTrips) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Parece que no tienes ningún viaje por ahora...
          </Text>
          <TouchableOpacity
            style={styles.createRouteButton}
            onPress={handleCreateRoute}
          >
            <Text style={styles.createRouteButtonText}>Crear nueva ruta</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        {/* Aquí irían los TripCards cuando haya viajes */}
      </View>
    );
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



      {renderContent()}

      <UserModal
        visible={userModalVisible}
        onClose={() => setUserModalVisible(false)}
        onLogout={handleLogout}
        navigation={navigation}
      />
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  createRouteButton: {
    backgroundColor: '#003859',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createRouteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
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

export default DriverHome;