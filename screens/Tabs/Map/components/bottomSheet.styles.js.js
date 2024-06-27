import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../../infrastructure/theme";

export const styles = StyleSheet.create({
  fillingStationImage: {
    marginHorizontal: wp(3),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: wp(35),
    height: hp(11),
    padding: wp(3),
    borderRadius: 20,
    marginVertical:hp(2.5)
  },
  imageStyle: {
    borderRadius: 15,
  },
  nameAvailabilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // marginVertical:5
  },
  name: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.heading,
    fontSize: hp(2.5),
  },
  availability: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.body,
    fontSize: hp(1.5),
  },
  availabilityClosed: {
    color: theme.colors.text.error,
    fontFamily: theme.fonts.body,
    fontSize: hp(1.5),
  },
  location: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.body,
    fontSize: hp(1.4),
    marginLeft: 5,
  },
  container: {
    width: "80%",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    marginVertical: 5,
  },
  productInfoContainer: {},
  product: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.bg.primary,
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp(70),
    marginVertical: hp(1.3),
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  productName: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.heading,
    fontSize: hp(1.5),
    width: 100,
    textAlign: "left",
  },
  productPrice: {
    color: theme.colors.text.error,
    fontFamily: theme.fonts.heading,
    fontSize: hp(1.5),
    width: 100,
    textAlign: "center",
  },
  productAvailability: {
    color: theme.colors.text.tertiary,
    fontFamily: theme.fonts.heading,
    fontSize: hp(1.2),
    width: 100,
    textAlign: "right",
  },
  buttonStyle: {
    backgroundColor: theme.colors.bg.primary,
    borderRadius: 10,
    paddingVertical: hp(0.5),
    width: 160,
  },
  buttonContainerStyle: {
    marginTop: hp(1),
  },
  loadingImage: {
    position:"absolute",
    marginHorizontal: wp(3),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: wp(35),
    height: hp(11),
    padding: wp(3),
    borderRadius: 20,
    marginVertical:hp(2.5)
  },
});



