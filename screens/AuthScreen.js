import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import styled from "styled-components";
import { theme } from "../infrastructure/theme";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window")

const AuthView = styled(View)`
  background-color: ${theme.colors.bg.primary};
  flex: 1;
  padding: 20px;
`;
const LogoView = styled(View)`
  width: 10%;
`

export default function AuthScreen() {
    const navigation = useNavigation()

    const handleLogin = ()=>{
        navigation.navigate("Login")
    }
    const handleSignUp = ()=>{
        navigation.navigate("SignUp")
    }

    return (
        <AuthView>
            <LogoView>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
            </LogoView>
            <View style={styles.onboardContainer}>
                <Image style={styles.onboradImage} source={require("../assets/onboard-4.png")} />
            </View>
            <View style={{top:-60}}>
                <Text style={styles.title}>Let’s{"\n"}get started</Text>
                <Text style={styles.subtitle}>Find fuel anytime and anywhere</Text>
            </View>
            <View style={{top:-20, gap:30}}>
                <Button title="Login"
                    buttonStyle={{
                        backgroundColor: theme.colors.bg.secondary,
                        width: 100 + "%",
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
                        fontSize: 20,
                        fontWeight: '600'
                    }} onPress={handleLogin}/>
                <Button title="Sign Up"
                    buttonStyle={{
                        backgroundColor: theme.colors.bg.tertiary,
                        width: 100 + "%",
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
                        fontSize: 20,
                        fontWeight: '600'
                    }} onPress={handleSignUp} />
            </View>
        </AuthView>
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 150,
        resizeMode: "contain"
    },
    onboardContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        width: width,
        height: height * 0.4,
        marginLeft: "auto",
        paddingBottom: 0,
        top:-50
    },
    onboradImage: {
        width: width * 0.85,
        resizeMode: "contain",
        padding: 0,
    },
    title: {
        color: theme.colors.text.tertiary,
        fontFamily: theme.fonts.heading,
        fontSize: 45,
        fontWeight: "600",
        lineHeight: 60,
        paddingLeft: 10,
        marginLeft: 0,
        marginTop: 20,
    },
    subtitle: {
        color: theme.colors.text.tertiary,
        fontFamily: theme.fonts.body,
        fontSize: 20,
        fontWeight: "600",
        paddingLeft: 10,
        marginTop: 20,
    }
})