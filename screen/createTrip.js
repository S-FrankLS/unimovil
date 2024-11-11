import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomAlert, InputField } from "../components";
import { tripsService } from '../services/trips.service';
import { windowHeight } from '../utils/Dimenstios';
import { tripSchema } from '../utils/validations';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateTrip = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        title: "",
        message: "",
        type: "success",
        buttons: [],
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(tripSchema),
        defaultValues: {
            nombreConductor: '',
            lugarDestino: '',
            lugarPartida: '',
            horaPartida: '',
            costo: '',
            numeroCupos: ''
        }
    });

    const hideAlert = () => {
        setAlertConfig((prev) => ({ ...prev, visible: false }));
    };

    const showAlert = (config) => {
        setAlertConfig({
            visible: true,
            ...config,
        });
    };

    const onTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === 'android') {
            setShowTimePicker(false);
        }

        if (event.type === "set") {
            setDate(currentDate);
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            setValue('horaPartida', `${hours}:${minutes}`);
        } else {
            setShowTimePicker(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await tripsService.createTrip(data);

            showAlert({
                title: 'Ruta creada',
                message: '¡Tu ruta ha sido creada con éxito!',
                type: 'success',
                buttons: [
                    {
                        text: 'Continuar',
                        onPress: () => {
                            hideAlert();
                            navigation.goBack();
                        },
                    },
                ],
            });
        } catch (error) {
            showAlert({
                title: 'Error',
                message: error.message || 'Error al crear la ruta',
                type: 'error',
                buttons: [{ text: 'Entendido', onPress: hideAlert }],
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Crear nueva ruta</Text>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <InputField
                        control={control}
                        errors={errors}
                        name="nombreConductor"
                        placeholder="Nombre del conductor"
                        icon="person"
                    />

                    <InputField
                        control={control}
                        errors={errors}
                        name="lugarPartida"
                        placeholder="Lugar de partida"
                        icon="location"
                    />

                    <InputField
                        control={control}
                        errors={errors}
                        name="lugarDestino"
                        placeholder="Lugar de destino"
                        icon="location"
                    />

                    <Controller
                        control={control}
                        name="horaPartida"
                        render={({ field: { value } }) => (
                            <>
                                <TouchableOpacity
                                    style={styles.timePickerButton}
                                    onPress={() => setShowTimePicker(true)}
                                >
                                    <Ionicons name="time" size={24} color="#003859" />
                                    <Text style={styles.timePickerText}>
                                        {value || "Seleccionar hora de partida"}
                                    </Text>
                                </TouchableOpacity>
                                {errors.horaPartida && (
                                    <Text style={styles.errorText}>{errors.horaPartida.message}</Text>
                                )}
                            </>
                        )}
                    />

                    {showTimePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onTimeChange}
                        />
                    )}

                    <InputField
                        control={control}
                        errors={errors}
                        name="costo"
                        placeholder="Costo del viaje"
                        icon="cash"
                        keyboardType="numeric"
                    />

                    <InputField
                        control={control}
                        errors={errors}
                        name="numeroCupos"
                        placeholder="Número de cupos"
                        icon="people"
                        keyboardType="numeric"
                    />

                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={handleSubmit(onSubmit)}
                        disabled={isLoading}
                    >
                        <Text style={styles.createButtonText}>
                            {isLoading ? 'Creando...' : 'Crear ruta'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <CustomAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                buttons={alertConfig.buttons}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#003859",
        padding: 20,
        alignItems: "center",
        paddingTop: 0.08 * windowHeight,
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
    content: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    backButton: {
        backgroundColor: "#003859",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: "flex-start",
        marginBottom: 20,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        gap: 11
    },
    timePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#003859',
        borderRadius: 25,
        padding: 15,
        marginVertical: 5,
    },
    timePickerText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#003859',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 10,
    },
    createButton: {
        backgroundColor: "#003859",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 20,
    },
    createButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
});

export default CreateTrip;