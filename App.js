import { View, ActivityIndicator } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import styled from "styled-components";
import {
  useFonts as usePoppins,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";
import { theme } from "./infrastructure/theme";

const Loading = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  if (!poppinsLoaded) {
    return (
      <ActivityIndicator size="small" color={theme.colors.bg.primary}/>
    );
  }
  return <AppNavigation />;
}
