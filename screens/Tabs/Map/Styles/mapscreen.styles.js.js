import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../../infrastructure/theme";

export const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  searchbar: {
    position: "absolute",
    zIndex: 10,
    width: "80%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 100,
  },
  backButtonContainer: {
    position: "absolute",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: hp(12),
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: wp(65),
    shadowColor: "#00000089",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5.84,
    elevation: 7,
  },
  duration: {
    fontFamily: theme.fonts.medium,
    color: theme.colors.text.primary,
    fontSize: hp(1.8),
    textAlign: "center",
    marginTop: 15,
  },
  imageStyle: {
    borderRadius: 15,
  },
  imageStyleContainer: {
    position: "relative",
  },
  fillingStationImage: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: wp(25),
    height: hp(7),
    padding: wp(3),
  },
  imageContainer:{

  },
  loadingImage: {
    position:"absolute",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: wp(25),
    height: hp(7),
    padding: wp(3),
  },
});
