import { StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export const signupStyles = StyleSheet.create({
    form: {
      // borderWidth: 1,
      flex: 6,
    },
    authTextLabel: {
      color: theme.colors.text.foundation,
      fontSize: hp(2),
      fontFamily: theme.fonts.heading,
      padding: 0,
      textAlign: "left",
      marginTop: hp(0.5),
    },
    authTextInput: {
      width: wp(90),
      height: hp(3.5),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.text.foundation,
      fontSize: hp(2),
      fontFamily: theme.fonts.medium,
    },
    authTextInputP: {
      width: wp(80),
      height: hp(3.5),
      fontSize: hp(2),
      fontFamily: theme.fonts.medium,
    },
    authPassword: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.text.foundation,
    },
    dashLine: {
      width: 100,
      margin: hp(1),
    },
    or: {
      marginTop: hp(2),
      flexDirection: "row",
      margin: "auto",
    },
    ortext: {
      color: theme.colors.text.primary,
      fontSize: hp(2),
      fontWeight: "700",
      fontFamily: theme.fonts.body,
    },
    mt: {
      marginTop: hp(2),
    },
    signup: {
      marginTop: hp(3),
      color: theme.colors.text.primary,
      fontSize: hp(1.7),
      fontFamily: theme.fonts.body,
    },
    signupLink: {
      color: theme.colors.text.secondary,
      fontWeight: "600",
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
    },
    intro: {
      marginTop: hp(4),
      marginBottom: hp(2),
      flex: 1,
    },
    forgotPassword: {
      justifyContent: "center",
      alignItems: "center",
      color: theme.colors.text.secondary,
      fontSize: hp(1.6),
    },
  });
  