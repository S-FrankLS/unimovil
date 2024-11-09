import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const icon = require('../assets/UniMovilPNG.png');

const Login = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()
  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // if (!email || !password) {
    //   Alert.alert("Error", "Por favor ingresa ambos campos");
    //   return;
    // }
    // // Aquí podrías realizar una llamada a la API para validar el login
    // Alert.alert("Bienvenido", `Iniciaste sesión con el correo: ${email}`);
    navigation.navigate("drivers")
  };

  return (



    <View style={styles.container}>

      <Image source={icon} style={{ width: 100, height: 100 }} />

      <Text style={styles.header}>Iniciar sesión</Text>


      {/* Campo de correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo de contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón de inicio de sesión */}
      <Button title="Iniciar sesión" onPress={handleLogin} />

      {/* Enlace para registrarse */}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    marginLeft: 5,
  },
});

export default Login;