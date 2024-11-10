// App.js
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screen/Login";
import Home from "./screen/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DriverHome from "./screen/Drivers";
import { AuthProvider, useAuth } from "./context/useAuth";
import { Signup } from "./screen/Signup";

function NavigationStack() {
  const { isAuthenticated, user } = useAuth();
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            {user?.role === "Rider" ? (
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false
                }}
              />
            ) : (
              <Stack.Screen
                name="drivers"
                component={DriverHome}
                options={{
                  headerShown: false
                }}
              />
            )}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={Signup}
              options={{ headerShown: false }}
            />
          </>
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
