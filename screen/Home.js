import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/useAuth';
import { SearchModal, TripCard, UserModal } from '../components';
import { windowHeight } from '../utils/Dimenstios';
import { useTrips } from '../hooks/useTrips';

const Home = ({ navigation }) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const { logout } = useAuth();
  const {
    trips,
    isLoading,
    error,
    isRefreshing,
    fetchTrips,
    handleRefresh
  } = useTrips();

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.messageText}>Cargando viajes...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchTrips()}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (trips.length === 0) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.messageText}>No hay viajes disponibles en este momento</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={trips}
        renderItem={({ item }) => (
          <TripCard
            location={item.lugarPartida}
            destination={item.lugarDestino}
            time={`${item.horaPartida}Hrs`}
            seats={item.numeroCupos}
            vehicleType={item.tipoVehiculo || "car"}
            driverName={item.nombreConductor}
          />
        )}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContent}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
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

      <View style={styles.content}>
        {renderContent()}
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3333',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#003859',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Home;