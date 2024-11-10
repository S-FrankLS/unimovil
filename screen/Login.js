// Login.js
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { useAuth } from "../context/useAuth";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../utils/validations";
import { InputField, CustomAlert } from "../components";

const icon = require("../assets/UniMovilPNG.png");
const windowHeight = Dimensions.get("window").height;

const Login = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
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
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      correo: '',
      password: '',
    },
  });

  const showAlert = (config) => {
    setAlertConfig({
      visible: true,
      ...config,
    });
  };

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const success = await login(data.correo, data.password);

      if (!success) {
        showAlert({
          title: "Error",
          message: "Credenciales inválidas",
          type: "error",
          buttons: [{ text: "Entendido", onPress: hideAlert }],
        });
      }
    } catch (error) {
      showAlert({
        title: "Error",
        message: error.message || "Error al iniciar sesión",
        type: "error",
        buttons: [{ text: "Entendido", onPress: hideAlert }],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inicio de sesión</Text>
      </View>

      <View style={styles.content}>
        <Image source={icon} style={styles.logo} />

        <View style={styles.inputContainer}>
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
            name="password"
            placeholder="Contraseña"
            icon="lock-closed"
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={() => navigation.navigate("signup")}
            >
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.loginButton,
                isLoading && styles.buttonDisabled
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <Text style={[styles.buttonText, styles.loginButtonText]}>
                {isLoading ? "Iniciando..." : "Iniciar sesión"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Turing inc.</Text>
        <Text style={styles.footerText}>http://dintev.univalle.edu.co</Text>
        <Text style={styles.footerText}>602 318 26 49 o 602 318 26 53</Text>
        <Text style={styles.footerText}>
          campusvirtual@correounivalle.edu.co
        </Text>
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 15,
  },
  forgotPassword: {
    color: "#003859",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: "48%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  createButton: {
    backgroundColor: "#5BA199",
  },
  loginButton: {
    backgroundColor: "#003859",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  loginButtonText: {
    color: "#fff",
  },
  footer: {
    backgroundColor: "#003859",
    padding: 20,
  },
  footerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Login;