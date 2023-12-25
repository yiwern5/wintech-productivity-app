import React from "react";
import { StyleSheet, Image } from 'react-native';
import Login from './screens/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import Challenge from "./screens/Challenge";
import { AntDesign } from '@expo/vector-icons'
import Tabs from "./navigation/Tabs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey={'pk_test_c3R1bm5pbmctc3F1aWQtMTcuY2xlcmsuYWNjb3VudHMuZGV2JA'}>
      <SignedIn>
        <NavigationContainer>
            {/* <Stack.Navigator>
                <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerStyle: {
                    height: 100,
                    },
                    headerTransparent: true,
                    title: "",
                    headerLeft: () => (
                    <AntDesign
                        name="menuunfold"
                        size={32}
                        color="#fff"
                        style={{ marginLeft: 35 }}
                    />
                    ),
                    headerRight: () => (
                    <Image
                        source={require("./assets/user.png")}
                        style={{ marginRight: 35, width: 75, height: 75 }}
                    />
                    ),
                }}
                />
                <Stack.Screen
                name="Challenge"
                component={Challenge}
                options={{
                    headerStyle: {
                    height: 100,
                    },
                    headerTransparent: true,
                    title: "",
                    headerLeft: () => (
                    <AntDesign
                        name="menuunfold"
                        size={32}
                        color="#000"
                        style={{ marginLeft: 35 }}
                    />
                    ),
                    headerRight: () => (
                    <Image
                        source={require("./assets/user.png")}
                        style={{ marginRight: 35, width: 75, height: 75 }}
                    />
                    ),
                }}
                />
            </Stack.Navigator> */}
            <Tabs />
        </NavigationContainer>
      </SignedIn>

      <SignedOut>
      <Login />
      </SignedOut>
    </ClerkProvider>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 20
    },
  });
