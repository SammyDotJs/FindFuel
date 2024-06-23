// src/Tabs/VOICEFLOW_ASSISTANT/VoiceFlowAssistant.tsx

import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { WebView } from "react-native-webview";
import appConfig from "../../../config";
import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";

const VoiceflowAssistant = forwardRef((props, ref) => {
  const webViewRef = useRef<WebView>(null);
  useImperativeHandle(ref, () => ({
    postMessage: (message) => {
      webViewRef.current?.postMessage(message);
    },
  }));

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={["*"]}
      source={require("../../../assets/android_asset/voiceflow.html")}
      javaScriptEnabled={true}
      style={styles.webView}
    />
  );
});

export default VoiceflowAssistant;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: theme.colors.bg.tertiary,
  },
});
