// Login.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
} from "react-native";
import "react-native-gesture-handler";
import { useAuth } from "../context/useAuth";

const icon = require("../assets/UniMovilPNG.png");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <Image source={icon} style={{ width: 100, height: 100 }} />
      <Text style={styles.header}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Iniciar sesión" onPress={handleLogin} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta?</Text>
        <Text style={styles.linkText}>Regístrate</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
  },
  footerText: {
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    color: "blue",
    marginLeft: 5,
  },
});

export default Login;
