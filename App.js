// App.js
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screen/Login";
import Home from "./screen/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Drivers from "./screen/Drivers";
import { AuthProvider, useAuth } from "./context/useAuth";

function NavigationStack() {
  const { isAuthenticated } = useAuth();
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerStyle: { backgroundColor: "#003859" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            />
            <Stack.Screen
              name="drivers"
              component={Drivers}
              options={{
                headerStyle: { backgroundColor: "#003859" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerStyle: { backgroundColor: "#003859" },
            }}
          />
        )}
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
