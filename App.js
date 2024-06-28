import { View, ActivityIndicator, StyleSheet } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import {
  useFonts as usePoppins,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { theme } from "./infrastructure/theme";
import { LocationContextProvider } from "./services/LocationContext";
import UserContextProvider from "./services/user/UserContext";
import { ExpoStatusBar } from "./navigation";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { UserLocationContext } from "./services/user/UserLocationContext";
import { SelectMarkerContext } from "./services/SelectMarkerContext";
import { BottomSheetProvider } from "./services/BottomSheetContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { MapViewProvider } from "./services/MapViewContext";
import LottieView from "lottie-react-native";

export default function App() {
  const [location, setLocation] = useState(null);
  const [stationLocation, setStationLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [placeListData, setPlaceListData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setStationLocation(location);

      // Location.watchPositionAsync(
      //   {
      //     accuracy: Location.Accuracy.High,
      //     timeInterval: 2000, // Update every 2 seconds
      //     distanceInterval: 1, // Update every meter
      //   },
      //   (newLocation) => {
      //     setLocation(newLocation);
      //   }
      // );
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!poppinsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBox}>
          <ActivityIndicator
            animating={true}
            size={50}
            color={theme.colors.bg.white}
          />
        </View>
      </View>
    );
  }
  return (
    <GestureHandlerRootView>
      <MapViewProvider>
        <BottomSheetProvider>
          <BottomSheetModalProvider>
            {/* <PanGestureHandler> */}
            <SelectMarkerContext.Provider
              value={{ selectedMarker, setSelectedMarker }}
            >
              <UserLocationContext.Provider
                value={{
                  location,
                  setLocation,
                  isFetching,
                  setIsFetching,
                  placeListData,
                  setPlaceListData,
                  stationLocation,
                  setStationLocation,
                  showDirections,
                  setShowDirections,
                }}
              >
                <UserContextProvider>
                  <LocationContextProvider>
                    <AppNavigation />
                  </LocationContextProvider>
                  <ExpoStatusBar style="auto" />
                </UserContextProvider>
              </UserLocationContext.Provider>
            </SelectMarkerContext.Provider>
            {/* </PanGestureHandler> */}
          </BottomSheetModalProvider>
        </BottomSheetProvider>
      </MapViewProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg.primary,
  },
  loadingBox: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: theme.colors.bg.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
