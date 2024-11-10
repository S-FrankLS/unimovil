
import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';

export const InputField = ({
    control,
    name,
    placeholder,
    icon,
    secureTextEntry,
    keyboardType,
    errors
}) => (
    <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
            <View>
                <View
                    style={[
                        styles.inputContainer,
                        errors?.[name] && styles.inputError,
                    ]}
                >
                    <Ionicons
                        name={icon}
                        size={24}
                        color="#003859"
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                {errors?.[name] && (
                    <Text style={styles.errorText}>{errors[name].message}</Text>
                )}
            </View>
        )}
    />
);


const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#003859',
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        height: 50, // Altura fija para mejor consistencia
        marginBottom: 4, // Espacio para el mensaje de error
    },
    icon: {
        marginRight: 10,
        width: 24, // Ancho fijo para mejor alineación
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
        paddingRight: 15,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'normal',
    },
    inputError: {
        borderColor: '#FF3B30', // Color de error iOS
        borderWidth: 1.5, // Ligeramente más grueso para el error
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginLeft: 15,
        marginTop: 4,
        fontWeight: '400',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'normal',
    },
    // Estilos para estados específicos
    focusedInput: {
        borderColor: '#007AFF', // Color de enfoque iOS
        borderWidth: 1.5,
    },
    disabledInput: {
        backgroundColor: '#F2F2F2',
        borderColor: '#C7C7CC',
    },
    disabledText: {
        color: '#8E8E93',
    },
    // Estilos para diferentes tipos de teclado
    numericInput: {
        letterSpacing: 1, // Mejor legibilidad para números
    },
    // Estilos para el placeholder
    placeholder: {
        color: '#999',
    },
    // Estilos para el texto de contraseña
    secureTextEntry: {
        letterSpacing: 2, // Mejor visualización de puntos de contraseña
    },
});
