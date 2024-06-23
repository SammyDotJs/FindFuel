import { View, ActivityIndicator } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import styled from "styled-components";
import {
  useFonts as usePoppins,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { theme } from "./infrastructure/theme";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { LocationContextProvider } from "./services/LocationContext";
import UserContextProvider from "./services/user/UserContext";
import WebView from "react-native-webview";
import { useEffect, useRef } from "react";

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const webViewRef = useRef < WebView > null;

  useEffect(() => {
    webViewRef.current?.postMessage(JSON.stringify({ type: "open" }));
    webViewRef.current?.postMessage(JSON.stringify({ type: "show" }));
  }, []);
  const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!poppinsLoaded) {
    return (
      <LoadingContainer>
        <ActivityIndicator
          animating={true}
          size={70}
          color={theme.colors.bg.primary}
        />
        <ExpoStatusBar />
      </LoadingContainer>
    );
  }
  return (
    <UserContextProvider>
      <LocationContextProvider>
        <AppNavigation />
      </LocationContextProvider>
    </UserContextProvider>
  );
}
