import { StyleSheet } from "react-native";
import { theme } from "../infrastructure/theme";
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
    width: "80%",
  },
  searchInputContainer: {
    elevation:5,
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
    paddingVertical: wp(2),
    fontFamily: theme.fonts.medium,
    width: "65%",
    fontSize: hp(1.4),
    // borderWidth:1
  },
  searchIcon: {
    // marginHorizontal: 20,
    margin: "auto",
    // elevation:5,
    // margin:10,
    // borderWidth:1,
    marginVertical: wp(2),
  },
});
