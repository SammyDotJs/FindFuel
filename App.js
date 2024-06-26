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
import { useEffect, useRef, useState } from "react";
import { UserLocationContext } from "./services/user/UserLocationContext";
import { SelectMarkerContext } from "./services/SelectMarkerContext";
import { BottomSheetProvider } from "./services/BottomSheetContext";
import { PortalProvider } from "@gorhom/portal";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [placeListData, setPlaceListData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
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
            color={theme.colors.bg.primary}
          />
        </View>
      </View>
    );
  }
  return (
    <PortalProvider>
      <BottomSheetProvider>
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
      </BottomSheetProvider>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  loadingBox: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: theme.colors.bg.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
});
