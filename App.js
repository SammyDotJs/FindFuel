import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import styled from "styled-components";
import {
  useFonts as usePoppins,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";

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
      <Loading>
        <Text>Loading...</Text>
      </Loading>
    );
  }
  return <AppNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#145858",
    alignItems: "center",
    justifyContent: "center",
  },
});
