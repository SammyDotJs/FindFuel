import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { SafeArea } from "../../../components/utils/Safe-area.component";
import { theme } from "../../../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AuthButton from "../../../components/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import styled from "styled-components";
import { fontWeights } from "../../../infrastructure/theme/fonts";
import { color } from "@rneui/base";
import { processFontFamily } from "expo-font";
import { styles } from "./Styles/otpScreen.styles";

const OtpContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

export default function OtpScreen() {
  const [disabled, setDisabled] = useState(true);
  const [otpCode, setOtpCode] = useState("");
  const navigation = useNavigation();

  const handleLogin = (props) => {
    navigation.navigate("Tabs");
  };
  // const handleFilled = (code) => {
  //   code.length === 4 && setDisabled(false);
  // };

  useEffect(() => {
    otpCode.length === 4 ? setDisabled(false) : setDisabled(true);
  }, [otpCode]);
  console.log(disabled);
  return (
    <SafeAreaView>
      <View style={{ height: hp(70), justifyContent: "center" }}>
        <View style={styles.intro}>
          <Text style={styles.welcome}>OTP Verification</Text>
          <Text style={styles.subWelcome}>
            Enter OTP sent to{" "}
            <Text style={{ fontWeight: "900" }}>johndoe455@gmail.com</Text>
          </Text>
        </View>
        <OtpContainer>
          <OtpInput
            // onFilled={handleFilled}
            focusColor="#000"
            numberOfDigits={4}
            onTextChange={(text) => setOtpCode(text)}
            theme={{
              pinCodeTextStyle: {
                fontWeight: "500",
                fontFamily: theme.fonts.heading,
                color: theme.colors.text.black,
                padding: 0,
              },
              containerStyle: {
                width: wp(65),
              },
              pinCodeContainerStyle: {
                borderRadius: 0,
                borderTopWidth: 0,
                borderTopColor: theme.colors.bg.whiteFaded,
                borderLeftWidth: 0,
                borderLeftColor: theme.colors.bg.whiteFaded,
                borderRightWidth: 0,
                borderRightColor: theme.colors.bg.whiteFaded,
                borderBottomWidth: 2,
                borderBottomColor: "#000",
                width: 50,
              },
              focusedPinCodeContainerStyle: {
                borderWidth: 1,
                borderBottomColor: theme.colors.ui.black,
              },
            }}
          />
          <Button
            title="Verify"
            buttonStyle={{
              backgroundColor: theme.colors.bg.primary,
              width: "auto",
              borderRadius: 10,
              color: theme.colors.text.white,
              paddingVertical: 10,
              paddingHorizontal: wp(11),
              marginTop: 30,
            }}
            containerViewStyle={{
              marginVertical: 10,
              width: 70,
              backgroundColor: theme.colors.bg.primary,
            }}
            titleStyle={{
              color: theme.colors.text.white,
              fontFamily: theme.fonts.bold,
              fontSize: hp(2),
              fontWeight: "600",
            }}
            disabled={disabled}
            onPress={handleLogin}
          />
        </OtpContainer>
        <View style={styles.forgotPassword}>
          <Text style={styles.signup}>
            Didn’t receive the OTP?
            <Text onPress={handleLogin} style={styles.signupLink}>
              Resend OTP
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}