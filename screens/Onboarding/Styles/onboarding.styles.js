import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../infrastructure/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.white,
  },
  skipStyle: {
    color: theme.colors.text.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.primary,
    fontSize: hp(2),
    marginLeft: wp(3),
    marginBottom: hp(2),
  },
  nextStyle: {},
  titleStyles: {
    color: theme.colors.text.primary,
    fontSize: hp(3),
    fontWeight: "600",
    lineHeight: hp(60),
    paddingLeft: 20,
    marginLeft: 0,
    width: wp(100),
    marginTop: 20,
  },
  onboardContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: wp(90),
    height: hp(50),
    marginLeft: "auto",
    marginTop: 10,
    paddingBottom: 0,
  },
  onboradImage: {
    width: wp(80),
    resizeMode: "contain",
    padding: 0,
  },
});
