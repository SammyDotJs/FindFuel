import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../infrastructure/theme";
import styled from "styled-components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BackArrowBackground = styled(View)`
  background-color: ${theme.colors.bg.tertiary};
  border-radius: 50%;
  width: 41px;
  height: 41px;
  justify-content: center;
  align-items: center;
`;

export default function BackButton({ onPress }) {

  return (
    // <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.BackArrowBackground} activeOpacity={0.8}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={hp(4)}
          color={theme.colors.bg.primary}
        />
      </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  BackArrowBackground: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    backgroundColor: theme.colors.bg.white,
    borderRadius: 50,
    width: hp(4.5),
    height: hp(4.5),
    marginLeft: wp(4),
    opacity: 0.9,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    position: "absolute",
    zIndex: 999,
    top: hp(9),
    width: "80%",
  }
});
