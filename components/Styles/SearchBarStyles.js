import { StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const searchStyles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    zIndex: 999,
    top: hp(9),
  },
  searchInputContainer: {
    borderRadius: 25,
    backgroundColor: theme.colors.bg.white,
    overflow: "hidden",
    shadowColor: "#C2C2C2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    alignItems: "center",
    // justifyContent: "center",
  },
  searchInput: {
    fontFamily: theme.fonts.medium,
    width: "65%",
    fontSize: hp(1.4),
  },
  searchIcon: {
    margin: "auto",
  },
});
