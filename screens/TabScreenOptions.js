import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { theme } from "../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const ScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarLabelStyle: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.heading,
    fontSize: hp(1.4),
    marginTop: 5,
  },
  tabBarStyle: {
    position: "absolute",
    elevation: 0,
    height: hp(10),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  tabBarHideOnKeyboard: true,
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
        <SimpleLineIcons
          name={iconName + "-pin"}
          size={28}
          color={theme.colors.bg.primary}
        />
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
