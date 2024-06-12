// VoiceflowAssistant.js
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const VoiceflowAssistant = () => {
    return (
        <View style={styles.container}>
            <WebView
                source={require("../../../assets/android_asset/voiceflow.html")}
                style={styles.webview}
                originWhitelist={['*']}
            />
            <ExpoStatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // bottom: 20,
        // right: 20,
        width: "100%",  // adjust the size as needed
        height: "100%", // adjust the size as needed
        zIndex:-999
    },
    webview: {
        // flex: 1,
        // backgroundColor: 'transparent',
    },
});

export default VoiceflowAssistant;
