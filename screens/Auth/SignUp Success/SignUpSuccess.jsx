import { View, Text } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { styles } from "./Styles/SignUpSuccess.styles";
import AuthButton from "../../../components/AuthButton";
import { theme } from "../../../infrastructure/theme";

const SignUpSuccess = ({ navigation }) => {
  const animation = useRef(null);
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.welcome}>Success!!</Text>
        <Text style={styles.subWelcome}>
          Congratulations you account has been successfully created
        </Text>
      </View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "transparent",
        }}
        source={require("../../../assets/bT4ScReX3B.json")}
      />
      <View style={{marginTop:hp(19)}}>
        <AuthButton
          handleAction={() => navigation.navigate("Login")}
          title={"Continue to Log in"}
          backgroundColor={theme.colors.bg.primary}
          color={theme.colors.text.white}
          width={wp(50)}
          fontSize={hp(1.7)}
          paddingVertical
        />
      </View>
    </View>
  );
};

export default SignUpSuccess;
