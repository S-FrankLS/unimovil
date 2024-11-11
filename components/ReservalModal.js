import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ReservationModal = ({ visible, onClose, onReserve, driverInfo }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* Header with reservation number */}
                    <Text style={styles.reservationHeader}>Reserva de cupo 2</Text>

                    {/* Driver Info Section */}
                    <View style={styles.driverSection}>
                        <LinearGradient
                            colors={['#003859', '#00C2CE']}
                            style={styles.avatarContainer}
                        >
                            <Text style={styles.avatarText}>M</Text>
                        </LinearGradient>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverLabel}>Conductor</Text>
                            <Text style={styles.driverName}>Mechas Castañeda</Text>
                        </View>
                        <TouchableOpacity style={styles.moreButton}>
                            <Ionicons name="ellipsis-vertical" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {/* Map Section */}
                    <View style={styles.mapContainer}>
                        <Image
                            source={{ uri: '/api/placeholder/400/200' }}
                            style={styles.map}
                        />
                        <View style={styles.mapOverlay}>
                            <Ionicons name="location" size={24} color="#003859" />
                        </View>
                    </View>

                    {/* Departure Details */}
                    <View style={styles.departureSection}>
                        <Text style={styles.departureLabel}>Salida:</Text>
                        <View style={styles.locationContainer}>
                            <Ionicons name="location-outline" size={20} color="#003859" />
                            <Text style={styles.departureLocation}>
                                Sede del Norte del Cauca - Santander
                            </Text>
                        </View>

                        <View style={styles.detailsContainer}>
                            <View style={styles.timeSection}>
                                <Ionicons name="time-outline" size={20} color="#003859" />
                                <Text style={styles.timeLabel}>Hora de salida: </Text>
                                <Text style={styles.timeValue}>18:00Hrs</Text>
                            </View>

                            <View style={styles.contactSection}>
                                <Ionicons name="logo-whatsapp" size={20} color="#003859" />
                                <Text style={styles.contactLabel}>WhatsApp: </Text>
                                <Text style={styles.contactValue}>300.0000</Text>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.button, styles.chatButton]}
                            onPress={() => { }}
                        >
                            <Text style={styles.chatButtonText}>Iniciar chat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.reserveButton]}
                            onPress={onReserve}
                        >
                            <Text style={styles.reserveButtonText}>Reservar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        paddingTop: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    reservationHeader: {
        fontSize: 20,
        color: '#333',
        marginBottom: 20,
        fontWeight: '600',
    },
    driverSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 15,
    },
    avatarContainer: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#003859',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatarText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    },
    driverInfo: {
        flex: 1,
        marginLeft: 15,
    },
    driverLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    driverName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    moreButton: {
        padding: 10,
    },
    mapContainer: {
        height: 180,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -12 }, { translateY: -12 }],
    },
    departureSection: {
        marginBottom: 25,
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 15,
    },
    departureLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingRight: 20,
    },
    departureLocation: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginLeft: 8,
        flex: 1,
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
    },
    timeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    timeLabel: {
        fontSize: 15,
        color: '#666',
        marginLeft: 8,
    },
    timeValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    contactSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactLabel: {
        fontSize: 15,
        color: '#666',
        marginLeft: 8,
    },
    contactValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 6,
    },
    chatButton: {
        backgroundColor: '#003859',
        shadowColor: '#003859',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#003859',
    },
    reserveButton: {
        backgroundColor: '#003859',
        shadowColor: '#003859',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    chatButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    cancelButtonText: {
        color: '#003859',
        fontSize: 15,
        fontWeight: '600',
    },
    reserveButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
});

export default ReservationModal;