import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { theme } from "../../infrastructure/theme";
import { Button } from "react-native-elements";

const LoginFailedModal = ({ isVisible, onClose }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isVisible);
  };
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0}
      style={styles.modal}
      onBackdropPress={onClose}
      animationIn={"fadeInDown"}
      animationOut={"fadeOutUp"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login Failed!</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.white,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "80%",
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.fonts.heading,
    color: theme.colors.text.error,
  },
  modal: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default LoginFailedModal;
