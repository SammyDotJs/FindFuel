import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";
import AuthButton from "../../components/AuthButton";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeArea } from "../../components/utils/Safe-area.component";

const AuthInput = styled(View)`
  position: relative;
  width: 95%;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const LoginStyle = styled(SafeAreaView)`
  flex: 1;
  padding: 0 ${wp(2)}px;
  align-items: start;
`;

// const AuthTextInput = styled(TextInput)`
//         width: wp(90);
//         height: hp(3.5);
//         border-bottom-width: ${bottomBarFocus};
//         border-bottom-color: ${theme.colors.text.foundation};
//         font-size: hp(2);
//         font-family: ${theme.fonts.bold};
// `

const googleIconJsx = () => {
  return (
    <Text
      style={{
        color: theme.colors.text.primary,
        fontFamily: theme.fonts.bold,
        fontSize: hp(2),
        fontWeight: "600",
      }}
    >
      <Image source={require("../../assets/devicon_google.png")} />
      Continue with Google
    </Text>
  );
};

export default function LoginScreen(props) {
  const [bottomBarFocus, setBottomBarFocus] = useState(1);

  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {
    console.log("login");
  };
  const handleSignup = () => {
    navigation.navigate("SignUp");
  };
  const customOnFocus = () => {
    props?.onFocus;
    setBottomBarFocus(3);
  };
  const customOnBlur = () => {
    props?.onBlur;
    setBottomBarFocus(1);
  };
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.container}
    >
      <ScrollView>
        <LoginStyle>
          <View style={styles.intro}>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.subWelcome}>Log In to continue</Text>
          </View>
          <View style={styles.onboardContainer}>
            <Image
              style={styles.onboradImage}
              source={require("../../assets/onboard-5.png")}
            />
          </View>
          <View style={styles.form}>
            <AuthInput>
              <View>
                <Text style={styles.authTextLabel}>Email</Text>
                <TextInput
                  onFocus={customOnFocus}
                  onBlur={customOnBlur}
                  style={styles.authTextInput}
                  // style={{width: wp(90),
                  //     height: hp(3.5),
                  //     borderBottomWidth: bottomBarFocus,
                  //     borderBottomColor: theme.colors.text.foundation,
                  //     fontSize: hp(2),
                  //     fontFamily: theme.fonts.bold,
                  // }}
                  onChangeText={(newText) => setText(newText)}
                  defaultValue={text}
                />
              </View>
            </AuthInput>
            <AuthInput style={{ marginTop: hp(2) }}>
              <View>
                <Text style={styles.authTextLabel}>Password</Text>
                <View style={styles.authPassword}>
                  <TextInput
                    secureTextEntry={showPassword}
                    style={styles.authTextInputP}
                    onChangeText={(newPassword) => setPassword(newPassword)}
                    defaultValue={password}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text
                      style={{
                        marginLeft: hp(1.3),
                        fontSize: hp(1.6),
                        color: theme.colors.text.secondary,
                        fontFamily: theme.fonts.heading,
                      }}
                    >
                      Show
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AuthInput>
          </View>
          <View style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </View>
          <View style={styles.btns}>
            {/* login handler */}
            <View style={styles.mt}>
              <AuthButton
                handleLogin={handleLogin}
                title="Login"
                backgroundColor={theme.colors.bg.primary}
                color={theme.colors.text.white}
              />
            </View>
            <View style={styles.or}>
              <Image
                style={styles.dashLine}
                source={require("../../assets/dashedLine.png")}
              />
              <Text style={styles.ortext}>OR</Text>
              <Image
                style={styles.dashLine}
                source={require("../../assets/dashedLine.png")}
              />
            </View>
            {/* login with google handler */}
            <View style={styles.mt}>
              <AuthButton
                handleLogin={handleLogin}
                title={googleIconJsx}
                backgroundColor={theme.colors.bg.white}
                color={theme.colors.text.primary}
                borderWidth={2}
                borderColor={theme.colors.bg.secondary}
              />
            </View>
          </View>
          <View style={styles.accountQuestion}>
            <Text style={styles.signup}>
              Don't have an account?
              <Text onPress={handleSignup} style={styles.signupLink}>
                SIGN UP
              </Text>
            </Text>
          </View>
        </LoginStyle>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authTextLabel: {
    color: theme.colors.text.foundation,
    fontSize: hp(2),
    fontFamily: theme.fonts.heading,
    padding: 0,
    textAlign: "left",
    marginTop: hp(2),
  },
  authTextInput: {
    width: wp(90),
    height: hp(3.5),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.foundation,
    fontSize: hp(2),
    fontFamily: theme.fonts.bold,
  },
  authTextInputP: {
    width: wp(78),
    height: hp(3.5),
    fontSize: hp(2),
    fontFamily: theme.fonts.bold,
  },
  authPassword: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.foundation,
  },
  onboardContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(100),
    height: hp(35),
    marginLeft: "auto",
    paddingBottom: 0,
  },
  onboradImage: {
    width: wp(50),
    resizeMode: "contain",
    padding: 0,
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.text.secondary,
    fontSize: hp(1.6),
    // flex: 1
  },
  accountQuestion: {
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.text.secondary,
    fontSize: hp(1.6),
    // flex: 1
  },
  forgotPasswordText: {
    marginTop: hp(3),
    color: theme.colors.text.secondary,
    fontSize: hp(1.6),
    fontFamily: theme.fonts.body,
  },
  dashLine: {
    width: 100,
    margin: hp(1),
  },
  or: {
    marginTop: hp(1),
    width: wp(100),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ortext: {
    color: theme.colors.text.primary,
    fontSize: hp(2),
    fontWeight: "700",
    fontFamily: theme.fonts.body,
  },
  btns: {
    // flex: 2
  },
  mt: {
    marginTop: hp(2),
    justifyContent: "center",
    alignItems: "center",
    // flex: 1
  },
  signup: {
    marginTop: hp(3),
    color: theme.colors.text.primary,
    fontSize: hp(1.6),
    fontFamily: theme.fonts.body,
  },
  signupLink: {
    color: theme.colors.text.secondary,
    fontWeight: "600",
  },
  welcome: {
    color: theme.colors.text.primary,
    fontSize: hp(3.2),
    fontFamily: theme.fonts.bold,
  },
  subWelcome: {
    color: theme.colors.text.foundation,
    fontSize: hp(2),
    fontFamily: theme.fonts.body,
  },
  intro: {
    // marginTop: hp(4),
    // flex: 1
  },
});
