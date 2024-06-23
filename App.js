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

export default function App() {

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
    <UserContextProvider>
      <LocationContextProvider>
        <AppNavigation />
      </LocationContextProvider>
      <ExpoStatusBar style="auto"/>
    </UserContextProvider>
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
