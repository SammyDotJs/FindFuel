import { SafeAreaView, StatusBar } from "react-native";
import { styled } from "styled-components";
import { theme } from "../../infrastructure/theme";

export const SafeArea = styled(SafeAreaView)`
  flex:1;
  background-color: ${theme.colors.bg.white};
`;
