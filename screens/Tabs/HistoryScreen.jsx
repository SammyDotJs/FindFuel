import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { useBottomSheet } from "../../services/BottomSheetContext";
import MapView from "react-native-maps";

const App = () => {
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return <MapView style={{ flex: 1 }}></MapView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default App;
