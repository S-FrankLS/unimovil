// Login.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import "react-native-gesture-handler";
import { useAuth } from "../context/useAuth";
import { useNavigation } from "@react-navigation/native";

const icon = require("../assets/UniMovilPNG.png");
const windowHeight = Dimensions.get("window").height;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigation();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa ambos campos");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      Alert.alert("Error", "Credenciales inválidas");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Inicio de sesión</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Image source={icon} style={styles.logo} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo institucional"
            placeholderTextColor="#666"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#666"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={() => {
                navigate.navigate("signup");
              }}
            >
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={handleLogin}
            >
              <Text style={[styles.buttonText, styles.loginButtonText]}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Turing inc.</Text>
        <Text style={styles.footerText}>http://dintev.univalle.edu.co</Text>
        <Text style={styles.footerText}>602 318 26 49 o 602 318 26 53</Text>
        <Text style={styles.footerText}>
          campusvirtual@correounivalle.edu.co
        </Text>
      </View>
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
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#003859",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
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
