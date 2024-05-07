import React from "react";
// import {StatusBar  as ExpoStatusBar} from 'expo-status-bar'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import HomeScreen from "../screens/HomeScreen";
import AuthScreen from "../screens/AuthScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";

const Stack = createNativeStackNavigator();

const ScreenOptions = {
  headerShown: false,
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Home"
          options={ScreenOptions}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Onboarding"
          options={ScreenOptions}
          component={OnboardingScreen}
        />
        <Stack.Screen name="Auth" options={ScreenOptions} component={AuthScreen} />
        <Stack.Screen name="Login" options={ScreenOptions} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={ScreenOptions} component={SignUpScreen} />
      </Stack.Navigator>
      <ExpoStatusBar style="auto" />
    </NavigationContainer>
  );
};

export default AppNavigation;
