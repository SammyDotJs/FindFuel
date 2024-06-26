import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../../infrastructure/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  searchbar: {
    position: "absolute",
    zIndex: 10,
    width: "80%",
    // paddingHorizontal: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 100,
  },
  backButtonContainer: {
    zIndex: 999,
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
});
