import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../../infrastructure/theme";
import AuthButton from "../../../components/AuthButton";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyles } from "./Styles/loginScreen.styles.js";
import axios from "axios";
import { UserContext } from "../../../services/user/UserContext";
import Loader from "../../../components/Loader";
import LoginSuccessModal from "../../../components/Modals/LoginSuccessModal";
import LoginFailedModal from "../../../components/Modals/LoginFailedModal";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

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
      <Image source={require("../../../assets/devicon_google.png")} />
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
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccessModalVisible, setLoginSuccessModalVisible] =
    useState(false);
  const [loginFailedModalVisible, setLoginFailedModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const { setLoggedDetails } = useContext(UserContext);

  const handleLogin = async () => {
    setTimeout(() => {
      setLoginSuccessModalVisible(true);
    }, 2000);

    setIsLoading(true);
    const url = "http://possible-gar-partially.ngrok-free.app/api/auth/login/";
    try {
      const response = await axios.post(
        url,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data sent successfully! Response:", response.data);
      response.data.user &&
        setTimeout(() => {
          setLoginSuccessModalVisible(true);
        }, 2000);
      setLoggedDetails(response.data);
      response.data.user ? navigation.navigate("Tabs") : console.log("null");
    } catch (error) {
      console.error("Error sending data:", error);
      setLoginFailedModalVisible(true);
      setTimeout(() => {
        setLoginFailedModalVisible(false);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setLoginSuccessModalVisible(false);
    setModalVisible(false);
  };

  const handleCloseFailedModal = () => {
    setLoginFailedModalVisible(false);
    setModalVisible(false);
  };
  const handleSignup = () => {
    navigation.navigate("SignUp");
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
  };

  // useEffect(() => {
  //   setLoginSuccessModalVisible(true);
  // }, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loader />
    </View>
  ) : (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={loginStyles.container}
    >
      <ScrollView>
        <LoginStyle>
          <LoginSuccessModal
            isVisible={loginSuccessModalVisible}
            onClose={handleCloseSuccessModal}
          />
          <LoginFailedModal
            isVisible={loginFailedModalVisible}
            onClose={handleCloseFailedModal}
          />
          <View style={loginStyles.intro}>
            <Text style={loginStyles.welcome}>Welcome!</Text>
            <Text style={loginStyles.subWelcome}>Log In to continue</Text>
          </View>
          <View style={loginStyles.onboardContainer}>
            <Image
              style={loginStyles.onboradImage}
              source={require("../../../assets/onboard-5.png")}
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
                  value={email}
                  keyboardType="email-address"
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
                    value={password}
                    keyboardType="password"
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
                handleAction={handleLogin}
                title="Login"
                backgroundColor={theme.colors.bg.primary}
                color={theme.colors.text.white}
              />
            </View>
            <View style={loginStyles.or}>
              <Image
                style={loginStyles.dashLine}
                source={require("../../../assets/dashedLine.png")}
              />
              <Text style={loginStyles.ortext}>OR</Text>
              <Image
                style={loginStyles.dashLine}
                source={require("../../../assets/dashedLine.png")}
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
      <ExpoStatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
