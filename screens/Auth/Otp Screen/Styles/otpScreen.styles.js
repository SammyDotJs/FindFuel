import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../../infrastructure/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  intro: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(5),
  },
  welcome: {
    color: theme.colors.text.primary,
    fontSize: hp(3.2),
    fontFamily: theme.fonts.bold,
  },
  subWelcome: {
    color: theme.colors.text.foundation,
    fontSize: hp(2),
    fontFamily: theme.fonts.body,
    marginTop: 10,
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.text.secondary,
    fontSize: hp(1.6),
  },
  signup: {
    marginTop: hp(3),
    color: theme.colors.text.foundation,
    fontSize: hp(1.7),
    fontFamily: theme.fonts.body,
  },
  signupLink: {
    color: theme.colors.text.secondary,
    fontWeight: "600",
  },
});
