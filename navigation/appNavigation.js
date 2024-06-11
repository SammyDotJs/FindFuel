import React from "react";
// import {StatusBar  as ExpoStatusBar} from 'expo-status-bar'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import MyTabs from "../screens/MyTabs";
import AuthScreen from "../screens/AuthScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import OtpScreen from "../screens/Auth/OtpScreen";
import HomeScreenNavigator from "../screens/Tabs/Home/homescreen.navigator";
import ViewAllFillingStations from "../screens/Tabs/Home/AllFillingStations/ViewAllFillingStations";

const Stack = createNativeStackNavigator();

const ScreenOptions = {
  headerShown: false,
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name="Tabs" options={ScreenOptions} component={MyTabs} />
        <Stack.Screen
          name="Onboarding"
          options={ScreenOptions}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Auth"
          options={ScreenOptions}
          component={AuthScreen}
        />
        <Stack.Screen
          name="Login"
          options={ScreenOptions}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={ScreenOptions}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="otp"
          options={ScreenOptions}
          component={OtpScreen}
        />
      </Stack.Navigator>
      <ExpoStatusBar style="auto" />
    </NavigationContainer>
  );
};

export default AppNavigation;
