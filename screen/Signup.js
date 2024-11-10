import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener expo/vector-icons instalado
import { CustomAlert } from "../components";

export const Signup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    codigo: '',
    password: '',
    confirmarPassword: '',
  });
  const [isConductor, setIsConductor] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'success',
    buttons: []
  });

  const showAlert = (config) => {
    setAlertConfig({
      visible: true,
      ...config
    });
  };

  const hideAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };

  const handleCreateAccount = () => {
    // Validaciones básicas
    if (!formData.nombre || !formData.apellido || !formData.correo ||
      !formData.codigo || !formData.password || !formData.confirmarPassword) {
      showAlert({
        title: 'Error',
        message: 'Por favor complete todos los campos',
        type: 'error',
        buttons: [
          { text: 'Entendido', onPress: hideAlert }
        ]
      });
      return;
    }

    if (formData.password !== formData.confirmarPassword) {
      showAlert({
        title: 'Error',
        message: 'Las contraseñas no coinciden',
        type: 'error',
        buttons: [
          { text: 'Entendido', onPress: hideAlert }
        ]
      });
      return;
    }

    // Aquí iría la lógica para crear la cuenta
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
          }
        }
      ]
    });
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Crear cuenta</Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Botón Volver */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          {/* Campo Nombre */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="person"
              size={24}
              color="#003859"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formData.nombre}
              onChangeText={(text) =>
                setFormData({ ...formData, nombre: text })
              }
            />
          </View>

          {/* Campo Apellido */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="person"
              size={24}
              color="#003859"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={formData.apellido}
              onChangeText={(text) =>
                setFormData({ ...formData, apellido: text })
              }
            />
          </View>

          {/* Campo Correo institucional */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail"
              size={24}
              color="#003859"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo institucional"
              keyboardType="email-address"
              value={formData.correo}
              onChangeText={(text) =>
                setFormData({ ...formData, correo: text })
              }
            />
          </View>

          {/* Campo Código estudiantil */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="card"
              size={24}
              color="#003859"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Código estudiantil"
              keyboardType="numeric"
              value={formData.codigo}
              onChangeText={(text) =>
                setFormData({ ...formData, codigo: text })
              }
            />
          </View>

          {/* Campo Contraseña */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed"
              size={24}
              color="#003859"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />
          </View>

          {/* Campo Confirmar contraseña */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed"
              size={24}
              color="#003859"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={formData.confirmarPassword}
              onChangeText={(text) =>
                setFormData({ ...formData, confirmarPassword: text })
              }
            />
          </View>

          {/* Checkbox conductor */}
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

          {/* Botón Crear cuenta */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAccount}
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
