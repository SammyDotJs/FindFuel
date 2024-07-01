import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../../infrastructure/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container:{
    flex:0.9,
    justifyContent:"space-evenly",
    alignItems:"center",
    padding:20,
    margin:"auto"
},
  intro: {
    // justifyContent: "center",
    alignItems: "center",
    // marginTop: hp(5),
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
    textAlign:"center"
  },
});
