// components/CustomAlert/CustomAlert.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Animated, StyleSheet } from 'react-native';

export const CustomAlert = ({
    visible,
    title,
    message,
    buttons = [{ text: 'Continuar', onPress: () => { } }],
    type = 'success' // 'success' | 'error' | 'info'
}) => {
    const getIconName = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '!';
            case 'info':
                return 'i';
            default:
                return '✓';
        }
    };

    const getIconStyle = () => {
        switch (type) {
            case 'success':
                return styles.successIcon;
            case 'error':
                return styles.errorIcon;
            case 'info':
                return styles.infoIcon;
            default:
                return styles.successIcon;
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={[styles.iconContainer, getIconStyle()]}>
                        <Text style={styles.icon}>{getIconName()}</Text>
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    {message && <Text style={styles.message}>{message}</Text>}

                    <View style={styles.buttonContainer}>
                        {buttons.map((button, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.button,
                                    index === buttons.length - 1 && styles.primaryButton,
                                    type === 'error' && styles.errorButton,
                                    buttons.length > 1 && index === 0 && styles.secondaryButton
                                ]}
                                onPress={button.onPress}
                            >
                                <Text style={[
                                    styles.buttonText,
                                    index !== buttons.length - 1 && styles.secondaryButtonText
                                ]}>
                                    {button.text}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '80%',
        maxWidth: 400,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    successIcon: {
        backgroundColor: '#4CAF50',
    },
    errorIcon: {
        backgroundColor: '#F44336',
    },
    infoIcon: {
        backgroundColor: '#2196F3',
    },
    icon: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        minWidth: 120,
        marginHorizontal: 5,
    },
    primaryButton: {
        backgroundColor: '#003859',
    },
    errorButton: {
        backgroundColor: '#F44336',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#003859',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    secondaryButtonText: {
        color: '#003859',
    },
});