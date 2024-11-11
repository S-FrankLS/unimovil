import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';


export const SelectField = ({
    control,
    name,
    placeholder,
    icon,
    errors,
    options = [],
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <View>
                    <TouchableOpacity
                        style={[
                            styles.selectContainer,
                            errors?.[name] && styles.selectError,
                        ]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name={icon} size={24} color="#003859" style={styles.icon} />
                        <Text style={[
                            styles.selectText,
                            !value && styles.placeholderText
                        ]}>
                            {value ? value : placeholder}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color="#003859" />
                    </TouchableOpacity>

                    {errors?.[name] && (
                        <Text style={styles.errorText}>{errors[name].message}</Text>
                    )}

                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="slide"
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Seleccionar tipo de vehículo</Text>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                        style={styles.closeButton}
                                    >
                                        <Ionicons name="close" size={24} color="#003859" />
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    data={options}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.optionItem,
                                                value === item && styles.selectedOption
                                            ]}
                                            onPress={() => {
                                                onChange(item);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={[
                                                styles.optionText,
                                                value === item && styles.selectedOptionText
                                            ]}>
                                                {item.charAt(0).toUpperCase() + item.slice(1)}
                                            </Text>
                                            {value === item && (
                                                <Ionicons name="checkmark" size={24} color="#fff" />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#003859',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#fff',
    },
    selectError: {
        borderColor: '#FF3B30',
    },
    icon: {
        marginRight: 10,
    },
    selectText: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    placeholderText: {
        color: '#999',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginLeft: 15,
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        height: '100%',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '100%',
        height: '30%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#003859',
    },
    closeButton: {
        padding: 5,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',

    },
    selectedOption: {
        backgroundColor: '#003859',
    },
    optionText: {
        fontSize: 16,
        color: '#000',
    },
    selectedOptionText: {
        color: '#fff',
    },
});