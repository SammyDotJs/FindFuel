import { View, Text, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styled from 'styled-components';
import { theme } from '../../infrastructure/theme';
import AuthButton from '../../components/AuthButton';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window")

const AuthInput = styled(View)`
    justify-content: center;
    align-items: center;
`

const LoginStyle = styled(View)`
flex: 1;
padding: 20px;
align-items: start;
`

const googleIconJsx = () => {
    return <Text style={{
        color: theme.colors.text.primary,
        fontFamily: theme.fonts.bold,
        fontSize: 20,
        fontWeight: '600'
    }}>
        <Image source={require("../../assets/devicon_google.png")} />
        Continue with Google</Text>
}

export default function LoginScreen() {

    const navigation = useNavigation()
    const [text, setText] = useState('');
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)

    const handleLogin = () => {
        console.log("login")
    }
    const handleSignup = () => {
        navigation.navigate("SignUp")
    }
    const authButtonStyle = {
        backgroundColor: theme.colors.bg.primary,
        color: theme.colors.text.white,
    }
    return (
        <LoginStyle>
            <View style={styles.intro}>
                <Text style={styles.welcome}>Welcome!</Text>
                <Text style={styles.subWelcome}>Log In to continue</Text>
            </View>
            <View style={styles.onboardContainer}>
                <Image style={styles.onboradImage} source={require("../../assets/onboard-5.png")} />
            </View>
            <View>
                <AuthInput>
                    <View>
                        <Text style={styles.authTextLabel}>Email</Text>
                        <TextInput
                            style={styles.authTextInput}
                            onChangeText={newText => setText(newText)}
                            defaultValue={text} />
                    </View>
                </AuthInput>
                <AuthInput style={{ marginTop: 20 }}>
                    <View>
                        <Text style={styles.authTextLabel}>Password</Text>
                        <View style={styles.authPassword}>
                            <TextInput
                                secureTextEntry={showPassword}
                                style={styles.authTextInputP}
                                onChangeText={newPassword => setPassword(newPassword)}
                                defaultValue={password} />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Text style={{ marginLeft: 10, fontSize: 16, color: theme.colors.text.secondary, fontFamily:theme.fonts.heading }}>Show</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </AuthInput>

            </View>
            <View style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>
            <View style={styles.mt}>
                <AuthButton handleLogin={handleLogin} title="Login" backgroundColor={theme.colors.bg.primary} color={theme.colors.text.white} />
            </View>
            <View style={styles.or}>
                <Image style={styles.dashLine} source={require("../../assets/dashedLine.png")} />
                <Text style={styles.ortext}>OR</Text>
                <Image style={styles.dashLine} source={require("../../assets/dashedLine.png")} />
            </View>
            <View style={styles.mt}>
                <AuthButton handleLogin={handleLogin} title={googleIconJsx} backgroundColor={theme.colors.bg.white} color={theme.colors.text.primary} borderWidth={2} borderColor={theme.colors.bg.secondary} />
            </View>
            <View style={styles.forgotPassword}>
                <Text style={styles.signup}>Don't have an account?
                    <Text onPress={handleSignup} style={styles.signupLink}>SIGN UP</Text>
                </Text>
            </View>
        </LoginStyle>

    )
}

const styles = StyleSheet.create({
    authTextLabel: {
        color: theme.colors.text.foundation,
        fontSize: 20,
        fontFamily: theme.fonts.heading,
        padding: 0,
        textAlign: "left"
    },
    authTextInput: {
        width: width * 0.9,
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.text.foundation,
        fontSize: 20,
        fontFamily: theme.fonts.bold
    },
    authTextInputP: {
        width: width * 0.78,
        height: 30,
        fontSize: 20,
        fontFamily: theme.fonts.bold
    },
    authPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.text.foundation
    },
    onboardContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height * 0.4,
        marginLeft: "auto",
        paddingBottom: 0,
    },
    onboradImage: {
        width: width * 0.5,
        resizeMode: "contain",
        padding: 0,
    },
    forgotPassword: {
        justifyContent: "center",
        alignItems: "center",
        color: theme.colors.text.secondary,
        fontSize: 16
    },
    forgotPasswordText: {
        marginTop: 30,
        color: theme.colors.text.secondary,
        fontSize: 16,
        fontFamily: theme.fonts.body
    },
    dashLine: {
        width: 100,
        margin: 10
    },
    or: {
        marginTop: 20,
        width: 100 + "%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    ortext: {
        color: theme.colors.text.primary,
        fontSize: 15,
        fontWeight: "700",
        fontFamily: theme.fonts.body
    },
    mt: {
        marginTop: 20
    },
    signup: {
        marginTop: 30,
        color: theme.colors.text.primary,
        fontSize: 16,
        fontFamily: theme.fonts.body
    },
    signupLink: {
        color: theme.colors.text.secondary,
        fontWeight: "600"
    },
    welcome: {
        color: theme.colors.text.primary,
        fontSize: 32,
        fontFamily: theme.fonts.bold
    },
    subWelcome: {
        color: theme.colors.text.foundation,
        fontSize: 20,
        fontFamily: theme.fonts.body
    }
})

