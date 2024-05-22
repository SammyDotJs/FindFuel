import {
  View,
  Text,
  Image,
  TextInput,
  loginStylesheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
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
import {
  lowercaseRegex,
  numberRegex,
  symbolRegex,
  uppercaseRegex,
} from "../../components/InputAuthentications";
import { loginStyles } from "./LoginScreenStyles";

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
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [conditionsMet, setConditionsMet] = useState(false);

  const hasUpper = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSymbol = symbolRegex.test(password);
  const lengthValid = password.length < 8;
  const emailIsValid = email.includes("@");

  const handleLogin = () => {
    //backend config
  };
  const handleSignup = () => {
    navigation.navigate("SignUp");
  };
  const handleOtp = () => {
    !conditionsMet && Alert.alert("Please fill in your details")
    conditionsMet && navigation.navigate("otp");
  };

  const customEmailOnBlur = () => {
    props?.onBlur;
    setEmailError("");
  };


  const customPasswordOnBlur = () => {
    setPasswordError("");
  };

  const emailChangeHandler = (mail) => {
    setEmail(mail);
  };
  const passwordChangeHandler = (pass) => {
    setPassword(pass);
  }
  
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={loginStyles.container}
    >
      <ScrollView>
        <LoginStyle>
          <View style={loginStyles.intro}>
            <Text style={loginStyles.welcome}>Welcome!</Text>
            <Text style={loginStyles.subWelcome}>Log In to continue</Text>
          </View>
          <View style={loginStyles.onboardContainer}>
            <Image
              style={loginStyles.onboradImage}
              source={require("../../assets/onboard-5.png")}
            />
          </View>
          <View style={loginStyles.form}>
            <AuthInput>
              <View>
                <Text style={loginStyles.authTextLabel}>Email</Text>
                <TextInput
                  onBlur={customEmailOnBlur}
                  style={loginStyles.authTextInput}
                  onChangeText={(mail) => emailChangeHandler(mail)}
                  defaultValue={email}
                />
              </View>
              <Text
                style={{
                  textAlign: "left",
                  width: wp(90),
                  color: theme.colors.text.error,
                  fontFamily: theme.fonts.heading,
                  paddingTop: hp(1),
                  fontSize: hp(1.4),
                }}
              >
                {emailError}
              </Text>
            </AuthInput>
            <AuthInput style={{ marginTop: hp(1) }}>
              <View>
                <Text style={loginStyles.authTextLabel}>Password</Text>
                <View style={loginStyles.authPassword}>
                  <TextInput
                    onBlur={customPasswordOnBlur}
                    secureTextEntry={showPassword}
                    style={loginStyles.authTextInputP}
                    onChangeText={(pass) => passwordChangeHandler(pass)}
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
              <Text
                style={{
                  textAlign: "left",
                  width: wp(90),
                  color: theme.colors.text.error,
                  fontFamily: theme.fonts.heading,
                  // borderWidth:1,
                  paddingTop: hp(1),
                  fontSize: hp(1.4),
                }}
              >
                {passwordError}
              </Text>
            </AuthInput>
          </View>
          <View style={loginStyles.forgotPassword}>
            <Text style={loginStyles.forgotPasswordText}>Forgot Password?</Text>
          </View>
          <View style={loginStyles.btns}>
            {/* login handler */}
            <View style={loginStyles.mt}>
              <AuthButton
                handleAction={handleOtp}
                title="Login"
                backgroundColor={theme.colors.bg.primary}
                color={theme.colors.text.white}
              />
            </View>
            <View style={loginStyles.or}>
              <Image
                style={loginStyles.dashLine}
                source={require("../../assets/dashedLine.png")}
              />
              <Text style={loginStyles.ortext}>OR</Text>
              <Image
                style={loginStyles.dashLine}
                source={require("../../assets/dashedLine.png")}
              />
            </View>
            {/* login with google handler */}
            <View style={loginStyles.mt}>
              <AuthButton
                handleAction={handleLogin}
                title={googleIconJsx}
                backgroundColor={theme.colors.bg.white}
                color={theme.colors.text.primary}
                borderWidth={2}
                borderColor={theme.colors.bg.secondary}
              />
            </View>
          </View>
          <View style={loginStyles.accountQuestion}>
            <Text style={loginStyles.signup}>
              Don't have an account?
              <Text onPress={handleSignup} style={loginStyles.signupLink}>
                SIGN UP
              </Text>
            </Text>
          </View>
        </LoginStyle>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}