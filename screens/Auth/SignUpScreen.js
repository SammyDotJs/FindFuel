import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import { theme } from "../../infrastructure/theme";
import { useNavigation } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeArea } from "../../components/utils/Safe-area.component";

const { width, height } = Dimensions.get("window");

const AuthInput = styled(View)`
  justify-content: center;
  align-items: center;
`;

const SignUpStyle = styled(View)`
  flex: 1;
  padding: 20px;
  align-items: start;
`;

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const [showPassword, setShowPassword] = useState(true);
    const [showCpassword, setShowCpassword] = useState(true);

    const handleSignup = () => {
        console.log("sign up")
    };
    const handleLogin = () => {
        navigation.navigate("Login");
    }

    const googleIconJsx = () => {
        return (
            <Text
                style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.bold,
                    fontSize: hp(2),
                    fontWeight: "600",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Image source={require("../../assets/devicon_google.png")} />
                Sign up with Google
            </Text>
        );
    };

    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            style={styles.container}>
            <ScrollView>
                    <SignUpStyle>
                        <View style={styles.intro}>
                            <Text style={styles.welcome}>Create an account</Text>
                            <Text style={styles.subWelcome}>Let’s get you started</Text>
                        </View>
                        <View style={styles.form}>
                            <AuthInput>
                                <View>
                                    <Text style={styles.authTextLabel}>Full Name</Text>
                                    <TextInput
                                        style={styles.authTextInput}
                                        onChangeText={(newName) => setName(newName)}
                                        defaultValue={name}
                                    />
                                </View>
                            </AuthInput>
                            <AuthInput>
                                <View>
                                    <Text style={styles.authTextLabel}>Email</Text>
                                    <TextInput
                                        keyboardType="email-address"
                                        style={styles.authTextInput}
                                        onChangeText={(newEmail) => setEmail(newEmail)}
                                        defaultValue={email}
                                    />
                                </View>
                            </AuthInput>
                            <AuthInput>
                                <View>
                                    <Text style={styles.authTextLabel}>Phone Number</Text>
                                    <TextInput
                                        keyboardType="phone-pad"
                                        style={styles.authTextInput}
                                        onChangeText={(newphoneNo) => setPhoneNo(newphoneNo)}
                                        defaultValue={phoneNo}
                                    />
                                </View>
                            </AuthInput>
                            <AuthInput style={{ marginTop: hp(1) }}>
                                <View>
                                    <Text style={styles.authTextLabel}>Password</Text>
                                    <View style={styles.authPassword}>
                                        <TextInput
                                            secureTextEntry={showPassword}
                                            style={styles.authTextInputP}
                                            onChangeText={(newPassword) => setPassword(newPassword)}
                                            defaultValue={password}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Text
                                                style={{
                                                    marginLeft: hp(1),
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
                            <AuthInput style={{ marginTop: hp(1), marginBottom: 20 }}>
                                <View>
                                    <Text style={styles.authTextLabel}>Confirm Password</Text>
                                    <View style={styles.authPassword}>
                                        <TextInput
                                            secureTextEntry={showCpassword}
                                            style={styles.authTextInputP}
                                            onChangeText={(newcPassword) => setCpassword(newcPassword)}
                                            defaultValue={cpassword}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowCpassword(!showCpassword)}
                                        >
                                            <Text
                                                style={{
                                                    marginLeft: hp(1),
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
                        {/* Sign Up  Handler */}
                        <View style={styles.mt}>
                            <AuthButton
                                handleLogin={handleSignup}
                                title="Sign Up"
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
                        {/* Sign Up with google handler */}
                        <View style={styles.mt}>
                            <AuthButton
                                handleLogin={handleSignup}
                                title={googleIconJsx}
                                backgroundColor={theme.colors.bg.white}
                                color={theme.colors.text.primary}
                                borderWidth={2}
                                borderColor={theme.colors.bg.secondary}
                            />
                        </View>
                        <View style={styles.forgotPassword}>
                            <Text style={styles.signup}>
                                Already have an account?
                                <Text onPress={handleLogin} style={styles.signupLink}>
                                    LOG IN
                                </Text>
                            </Text>
                        </View>
                    </SignUpStyle>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    form: {
        // borderWidth: 1,
        flex: 6
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
        width: wp(85),
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
    dashLine: {
        width: 100,
        margin: hp(1),
    },
    or: {
        marginTop: hp(2),
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
    mt: {
        marginTop: hp(2),

    },
    signup: {
        marginTop: hp(3),
        color: theme.colors.text.primary,
        fontSize: hp(1.7),
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
        marginTop: hp(8),
        marginBottom: hp(2),
        flex: 1
    },
    forgotPassword: {
        justifyContent: "center",
        alignItems: "center",
        color: theme.colors.text.secondary,
        fontSize: hp(1.6),
    },
});
