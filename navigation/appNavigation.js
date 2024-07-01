import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { TransitionSpecs } from "@react-navigation/stack";
import {
  OnboardingScreen,
  ExpoStatusBar,
  MyTabs,
  AuthScreen,
  LoginScreen,
  SignUpScreen,
  OtpScreen,
  SignUpSuccess
} from "./index";
import Chatbot from "../screens/Tabs/Chatbot/Chatbot.jsx";

const Stack = createNativeStackNavigator();

const AndroidTransitionSpec = {
  open: TransitionSpecs.TransitionIOSSpec,
  close: TransitionSpecs.TransitionIOSSpec,
};

const ScreenOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
  transitionSpec: {
    open: AndroidTransitionSpec,
    close: AndroidTransitionSpec,
  },
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
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
        <Stack.Screen
          name="SignUpSuccess"
          options={ScreenOptions}
          component={SignUpSuccess}
        />
        <Stack.Screen
          name="chatbot"
          options={ScreenOptions}
          component={Chatbot}
        ></Stack.Screen>
      </Stack.Navigator>
      <ExpoStatusBar style="auto" />
    </NavigationContainer>
  );
};

export default AppNavigation;
