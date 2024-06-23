import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import VoiceflowAssistant from "../VOICEFLOW ASSISTANT/VoiceFlowAssistant";
import { WebView } from "react-native-webview";
import BackButton from "../../../components/BackButton";

const Chatbot = ({ navigation }) => {
  const backToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "absolute", top:50 }}>
        <BackButton onPress={backToHome}/>
      </View>
      <VoiceflowAssistant />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"#FFF"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
});

export default Chatbot;
