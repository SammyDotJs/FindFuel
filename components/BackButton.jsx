import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.BackArrowBackground}
      activeOpacity={0.8}
    >
      <MaterialIcons
        name="keyboard-arrow-left"
        size={hp(4.5)}
        color={theme.colors.bg.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  BackArrowBackground: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    backgroundColor: theme.colors.bg.white,
    borderRadius: 50,
    height: 50,
    width: 50,
    marginLeft: wp(3.5),
    opacity: 0.9,
    shadowColor: "#00000089",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5.84,
    elevation: 7,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    position: "absolute",
    zIndex: 999,
    top: hp(9),
    width: "80%",
  },
});
