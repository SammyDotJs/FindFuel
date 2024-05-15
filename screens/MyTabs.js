import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeArea } from "../components/utils/Safe-area.component";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Tabs/HomeScreen";
import MapScreen from "./Tabs/MapScreen";
import HistoryScreen from "./Tabs/HistoryScreen";
import ProfileScreen from "./Tabs/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { theme } from "../infrastructure/theme";
import { BlurView } from "expo-blur";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fontWeights } from "../infrastructure/theme/fonts";

const Tab = createBottomTabNavigator();

const ScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) => {
    console.log(focused);

    let iconName;
    if (route.name === "Home") {
      iconName = "home";
      icon = (
        <AntDesign name={iconName} size={30} color={theme.colors.bg.primary} />
      );
    } else if (route.name === "Maps") {
      iconName = "location";
      icon = (
        <SimpleLineIcons name={iconName} size={30} color={theme.colors.bg.primary} />
      );
    } else if (route.name === "History") {
      iconName = "analytics";
      icon = (
        <Ionicons name={iconName} size={30} color={theme.colors.bg.primary} />
      );
    } else if (route.name === "Profile") {
      iconName = "user";
      icon = <Feather name="user" size={30} color={theme.colors.bg.primary} />;
    }

    // You can return any component that you like here!
    return icon;
  },
  tabBarLabelStyle: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.heading,
    fontSize: hp(1.4),
    marginTop: 5,
  },
  tabBarIconStyle: {},
  tabBarStyle: {
    position: "absolute",
    // bottom: hp(1),
    elevation: 0,
    height: hp(10),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  tabBarButton: (props) => {
    selected = props.accessibilityState.selected;
    let iconName;
    if (route.name === "Home") {
      iconName = "home";
      icon = (
        <AntDesign name={iconName} size={28} color={theme.colors.bg.primary} />
      );
    } else if (route.name === "Map") {
      iconName = "location";
      icon = (
        <SimpleLineIcons name={iconName+"-pin"} size={28} color={theme.colors.bg.primary} />
      );
    } else if (route.name === "History") {
      iconName = "analytics";
      icon = (
        <Ionicons name={iconName} size={28} color={theme.colors.bg.primary} />
      );
    } else if (route.name === "Profile") {
      iconName = "user";
      icon = <Feather name="user" size={28} color={theme.colors.bg.primary} />;
    }
    return (
      <TouchableOpacity
        {...props}
        style={{
          width: wp(95 / 4),
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
      >
        <View
          style={{
            width: wp((95 / 4) * 0.6),
            height: wp((95 / 4) * 0.6),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: selected ? theme.colors.bg.tertiary : "#fff",
            borderRadius: selected ? 50 : 0,
            padding: 5,
          }}
        >
          {icon}
          <Text
            style={{
              padding: 2,
              color: theme.colors.text.primary,
              fontFamily: selected ? theme.fonts.bold : theme.fonts.heading,
              fontSize: hp(1.4),
            }}
          >
            {route.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
});

export default function MyTabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Home" screenOptions={ScreenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
