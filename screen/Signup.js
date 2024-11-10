import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener expo/vector-icons instalado
import { CustomAlert, InputField } from "../components";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from "../utils/validations";
import { SelectField } from "../components/SelectField";
import { useAuth } from "../context/useAuth";

export const Signup = () => {
  const { register } = useAuth();
  const vehicleTypes = [
    'carro',
    'moto'
  ];

  const navigation = useNavigation();
  const [isConductor, setIsConductor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    reset
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      correo: '',
      codigo: '',
      password: '',
      confirmarPassword: '',
      placa: '',
      tipoVehiculo: '',
    },
    context: { isConductor }, // Pasar el estado del conductor al schema
    mode: 'onChange'
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


  // Actualizar el formulario cuando cambia el estado de conductor
  useEffect(() => {
    reset(undefined, {
      context: { isConductor }
    });
  }, [isConductor, reset]);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      setIsLoading(true);

      // Preparar los datos para la API
      const userData = {
        name: `${data.nombre} ${data.apellido}`,
        email: data.correo?.trim(),
        code: data.codigo,
        password: data.password,
        is_driver: isConductor,
        role: 'Estudiante',
        ...(isConductor && {
          vehiclePlate: data.placa,
          vehicleType: data.tipoVehiculo,
        }),
      };

      await register(userData);

      showAlert({
        title: 'Cuenta creada',
        message: 'Tu cuenta ha sido creada con éxito!',
        type: 'success',
        buttons: [
          {
            text: 'Continuar',
            onPress: () => {
              hideAlert();
              navigation.navigate('Login');
            },
          },
        ],
      });
    } catch (error) {
      showAlert({
        title: 'Error',
        message: error.message || 'Error al crear la cuenta',
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
        <Text style={styles.headerText}>Crear cuenta</Text>
      </View>
      <View style={styles.content}>
        {/* {__DEV__ && (
          <View style={styles.debugInfo}>
            <Text>Is Conductor: {String(isConductor)}</Text>
            <Text>Form Errors: {JSON.stringify(errors, null, 2)}</Text>
          </View>
        )} */}
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
            name="nombre"
            placeholder="Nombre"
            icon="person"
          />

          <InputField
            control={control}
            errors={errors}
            name="apellido"
            placeholder="Apellido"
            icon="person"
          />

          <InputField
            control={control}
            errors={errors}
            name="correo"
            placeholder="Correo institucional"
            icon="mail"
            keyboardType="email-address"
          />

          <InputField
            control={control}
            errors={errors}
            name="codigo"
            placeholder="Código estudiantil"
            icon="card"
            keyboardType="numeric"
          />

          <InputField
            control={control}
            errors={errors}
            name="password"
            placeholder="Contraseña"
            icon="lock-closed"
            secureTextEntry
          />

          <InputField
            control={control}
            errors={errors}
            name="confirmarPassword"
            placeholder="Confirmar contraseña"
            icon="lock-closed"
            secureTextEntry
          />

          {isConductor && (
            <>
              <InputField
                control={control}
                errors={errors}
                name="placa"
                placeholder="Placa del vehículo"
                icon="car"
              />

              <SelectField
                control={control}
                errors={errors}
                name="tipoVehiculo"
                placeholder="Seleccione tipo de vehículo"
                icon="car-sport"
                options={vehicleTypes}
              />
            </>
          )}
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>¿Eres conductor?</Text>
            <TouchableOpacity
              style={[styles.checkbox, isConductor && styles.checkboxChecked]}
              onPress={() => setIsConductor(!isConductor)}
            >
              {isConductor && (
                <Ionicons name="checkmark" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.createButtonText}>Crear cuenta</Text>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#003859",
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#003859",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#003859",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#003859",
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
