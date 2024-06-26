import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../infrastructure/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logo: {
    width: wp(30),
    resizeMode: "contain",
  },
  onboardContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: wp(100),
    height: hp(40),
    marginLeft: "auto",
    paddingBottom: 0,
    top: -hp(5),
  },
  onboradImage: {
    width: wp(85),
    resizeMode: "contain",
    padding: 0,
  },
  title: {
    color: theme.colors.text.tertiary,
    fontFamily: theme.fonts.heading,
    fontSize: hp(4.5),
    fontWeight: "600",
    lineHeight: hp(6),
    paddingLeft: wp(2),
    marginLeft: 0,
    marginTop: hp(2),
  },
  subtitle: {
    color: theme.colors.text.tertiary,
    fontFamily: theme.fonts.body,
    fontSize: hp(2),
    fontWeight: "600",
    paddingLeft: wp(2),
    marginTop: hp(2),
  },
});
