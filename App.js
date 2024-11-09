import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import 'react-native-gesture-handler';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screen/Login";
import Home from "./screen/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {

  const Stack = createStackNavigator();

function MyStack() {
  return (

    <SafeAreaProvider>

    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}
      
      options={{
        title: "",
        headerStyle: {backgroundColor: "#003859"},
      }}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="drivers" component={Home} />
    </Stack.Navigator>

    </SafeAreaProvider>

  );
}


  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});