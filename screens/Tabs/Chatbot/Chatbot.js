// MainScreen.js
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import VoiceflowAssistant from '../VOICEFLOW ASSISTANT/VoiceFlowAssistant'; // Adjust the import path as necessary

const Chatbot = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <VoiceflowAssistant />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Chatbot;
