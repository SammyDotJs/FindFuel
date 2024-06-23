import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FloatingButton = ({ onPress }) => {
    const animation = useRef(null)

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.button}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 70,
                        height: 70,
                        backgroundColor: 'transparent',
                    }}
                    source={require('../../assets/Animation - 1718192064136.json')}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: hp(10),
        right: wp(5),
        zIndex: 1000,
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 70,
        height: 70,
    },
});

export default FloatingButton;
