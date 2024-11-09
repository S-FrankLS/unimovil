import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { StyleSheet } from 'react-native';

export const UserModal = ({ visible, onClose, onLogout, navigation }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.userModalContainer}>
                <View style={styles.userModalContent}>
                    <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                            onClose();
                            navigation.navigate('Profile');
                        }}
                    >
                        <Text style={styles.modalItemText}>Cuenta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                            onClose();
                            navigation.navigate('DriverScreen');
                        }}
                    >
                        <Text style={styles.modalItemText}>Conductor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                            onClose();
                            navigation.navigate('Chat');
                        }}
                    >
                        <Text style={styles.modalItemText}>Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.modalItem, styles.logoutItem]}
                        onPress={onLogout}
                    >
                        <Text style={[styles.modalItemText, styles.logoutText]}>
                            Cerrar sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


 const styles = StyleSheet.create({
    userModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    userModalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalItemText: {
        fontSize: 16,
    },
    logoutItem: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: 'red',
    },
});