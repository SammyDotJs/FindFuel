import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { theme } from "../infrastructure/theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { TransitionPresets } from "@react-navigation/stack";
import { TransitionSpecs } from "@react-navigation/stack";


const AndroidTransitionSpec = {
  open: TransitionSpecs.TransitionIOSSpec,
  close: TransitionSpecs.TransitionIOSSpec,
};

export const ScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarLabelStyle: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.heading,
    fontSize: hp(1.4),
    marginTop: 5,
  },
  style: {
    borderTopWidth: 0
  },
  tabBarStyle: {
    position: "absolute",
    elevation: 0,
    height: hp(10),
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopWidth: 0,
  },
  tabBarHideOnKeyboard: true,
  tabBarButton: (props) => {
    const selected = props.accessibilityState.selected;
    const scale = useSharedValue(0.9);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: withTiming(scale.value, { duration: 300 }) }],
        opacity: withTiming(opacity.value, { duration: 300 }),
      };
    });

    React.useEffect(() => {
      if (selected) {
        scale.value = 1.2;
        opacity.value = 1;
      } else {
        scale.value = 1;
        opacity.value = 0.7;
      }
    }, [selected]);

    let icon;
    if (route.name === "Home") {
      icon = <AntDesign name="home" size={28} color={theme.colors.bg.primary} />;
    } else if (route.name === "Map") {
      icon = <SimpleLineIcons name="location-pin" size={28} color={theme.colors.bg.primary} />;
    } else if (route.name === "History") {
      icon = <Ionicons name="analytics" size={28} color={theme.colors.bg.primary} />;
    } else if (route.name === "Profile") {
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
        <Animated.View
          style={[
            {
              width: wp((95 / 4) * 0.6),
              height: wp((95 / 4) * 0.6),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selected ? theme.colors.bg.tertiary : "#fff",
              borderRadius: selected ? 50 : 0,
              padding: 5,
            },
            animatedStyle
          ]}
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
        </Animated.View>
      </TouchableOpacity>
    );
  },
  ...TransitionPresets.SlideFromRightIOS,
  transitionSpec: {
    open: AndroidTransitionSpec,
    close: AndroidTransitionSpec,
  },

});
