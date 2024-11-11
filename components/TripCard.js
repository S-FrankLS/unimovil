import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { StyleSheet } from 'react-native';

export const TripCard = ({ location, time, seats, vehicleType }) => {
    return (
        <View style={styles.tripContainer}>
            <Text style={styles.tripLabel}>Lugar de partida:</Text>
            <Text style={styles.tripLocation}>{location}</Text>

            <View style={styles.tripDetails}>
                {vehicleType === 'car' ? (
                    <Ionicons name="car" size={24} color="#000" />
                ) : (
                    <FontAwesome name="motorcycle" size={24} color="black" />
                )}
                <View style={styles.timeBox}>
                    <Text>{time}</Text>
                </View>
                <Ionicons name="people" size={24} color="#000" />
                <View style={styles.seatsBox}>
                    <Text>{seats}</Text>
                </View>
                <TouchableOpacity style={styles.reserveButton}>
                    <Text style={styles.reserveButtonText}>Reservar cupo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

 const styles = StyleSheet.create({
    tripContainer: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
    },
    tripLabel: {
        fontStyle: 'italic',
        color: '#003859',
    },
    tripLocation: {
        fontSize: 16,
        marginBottom: 10,
    },
    tripDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeBox: {
        borderWidth: 1,
        borderColor: '#003859',
        padding: 5,
        borderRadius: 5,
    },
    seatsBox: {
        borderWidth: 1,
        borderColor: '#003859',
        padding: 5,
        borderRadius: 5,
        width: 30,
        alignItems: 'center',
    },
    reserveButton: {
        backgroundColor: '#003859',
        padding: 10,
        borderRadius: 20,
    },
    reserveButtonText: {
        color: '#fff',
    },
});
