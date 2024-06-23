import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { theme } from '../infrastructure/theme';

const Loader = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.loader}>
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
            <Animated.View style={[styles.loaderSquare, { transform: [{ rotate }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
    },
    loaderSquare: {
        width: 28,
        height: 28,
        margin: 3,
        backgroundColor: theme.colors.bg.primary,
        borderRadius: 5
    },
});

export default Loader;
