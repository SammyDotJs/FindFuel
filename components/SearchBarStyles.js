import { StyleSheet } from "react-native";
import { theme } from "../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const searchStyles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    top: hp(9),
    width: "100%",
    marginTop: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.bg.white,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: wp(80),
    elevation: 5,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.3, // iOS shadow
    shadowRadius: 4, // iOS shadow
  },
  searchInput: {
    padding: wp(2),
    fontFamily: theme.fonts.medium,
    width: "65%",
    fontSize: hp(1.5),
  },
});
