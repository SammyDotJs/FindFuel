import { KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Tabs/Home/HomeScreen";
import MapScreen from "./Tabs/Map/MapScreen";
import HistoryScreen from "./Tabs/HistoryScreen";
import ProfileScreen from "./Tabs/ProfileScreen";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { ScreenOptions } from "./TabScreenOptions";
import { ThemeProvider } from "styled-components/native";

const ios = Platform.OS === "ios";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <KeyboardAvoidingView behavior={ios ? "padding" : null} style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Home" screenOptions={ScreenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <ExpoStatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
