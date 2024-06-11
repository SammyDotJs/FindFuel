import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { theme } from '../../infrastructure/theme';

const LoginSuccessModal = ({ isVisible, onClose }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isVisible);
    };
    return (
        <Modal isVisible={isVisible} backdropOpacity={0.5} onBackdropPress={toggleModal}>
            <View style={styles.container}>
                <Text style={styles.title}>Login Successful!</Text>
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.bg.white,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        width: "80%",
        elevation: 4
    },
    title: {
        fontSize: 16,
        fontFamily: theme.fonts.heading,
        color: theme.colors.text.primary,
    },
    modal: {
        justifyContent: "flex-start",
        alignItems: "center"
    }
});

export default LoginSuccessModal;
