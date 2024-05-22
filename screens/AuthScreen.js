import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import styled from "styled-components";
import { theme } from "../infrastructure/theme";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeArea } from "../components/utils/Safe-area.component";

const { width, height } = Dimensions.get("window");

const AuthView = styled(View)`
  flex: 1;

  background-color: ${theme.colors.bg.primary};
  padding: 20px;
`;
const LogoView = styled(View)`
  width: 10%;
`;

export default function AuthScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <AuthView>
          <LogoView>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
          </LogoView>
          <View style={styles.onboardContainer}>
            <Image
              style={styles.onboradImage}
              source={require("../assets/onboard-4.png")}
            />
          </View>
          <View style={{ top: -hp(6) }}>
            <Text style={styles.title}>Let’s{"\n"}get started</Text>
            <Text style={styles.subtitle}>Find fuel anytime and anywhere</Text>
          </View>
          <View style={{ top: -hp(2), gap: 30 }}>
            <Button
              title="Login"
              buttonStyle={{
                backgroundColor: theme.colors.bg.secondary,
                width: wp(90),
                borderRadius: 20,
                color: theme.colors.text.tertiary,
              }}
              containerViewStyle={{
                marginVertical: 10,
                width: 70,
                backgroundColor: theme.colors.bg.primary,
              }}
              titleStyle={{
                color: theme.colors.text.primary,
                fontFamily: theme.fonts.bold,
                fontSize: hp(2),
                fontWeight: "600",
              }}
              onPress={handleLogin}
            />
            <Button
              title="Sign Up"
              buttonStyle={{
                backgroundColor: theme.colors.bg.tertiary,
                width: wp(90),
                borderRadius: 20,
                color: theme.colors.text.tertiary,
              }}
              containerViewStyle={{
                marginVertical: 10,
                width: 70,
                backgroundColor: theme.colors.bg.primary,
              }}
              titleStyle={{
                color: theme.colors.text.primary,
                fontFamily: theme.fonts.bold,
                fontSize: hp(2),
                fontWeight: "600",
              }}
              onPress={handleSignUp}
            />
          </View>
        </AuthView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: wp(30),
    resizeMode: "contain",
  },
  onboardContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: wp(100),
    height: hp(40),
    marginLeft: "auto",
    paddingBottom: 0,
    top: -hp(5),
  },
  onboradImage: {
    width: wp(85),
    resizeMode: "contain",
    padding: 0,
  },
  title: {
    color: theme.colors.text.tertiary,
    fontFamily: theme.fonts.heading,
    fontSize: hp(4.5),
    fontWeight: "600",
    lineHeight: hp(6),
    paddingLeft: wp(2),
    marginLeft: 0,
    marginTop: hp(2),
  },
  subtitle: {
    color: theme.colors.text.tertiary,
    fontFamily: theme.fonts.body,
    fontSize: hp(2),
    fontWeight: "600",
    paddingLeft: wp(2),
    marginTop: hp(2),
  },
});
