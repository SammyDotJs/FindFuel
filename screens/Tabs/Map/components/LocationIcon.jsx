import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { theme } from "../../../../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LocationIcon = ({ goTo }) => {
  return (
    <TouchableOpacity
      style={styles.iconButton}
      activeOpacity={0.8}
      onPress={goTo}
    >
      <View style={styles.IconContainer}>
        <FontAwesome6
          name="location-crosshairs"
          size={24}
          color={theme.colors.bg.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LocationIcon;

const styles = StyleSheet.create({
  IconContainer: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.bg.white,
    borderRadius: 10,
    position: "absolute",
    bottom: hp(11),
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#C2C2C2",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  iconButton: {},
});
