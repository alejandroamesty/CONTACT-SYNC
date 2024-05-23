import React, { useState } from "react";
import { TouchableOpacity, Image, Animated, StyleSheet } from "react-native";

const ControlButton = ({ onPress, source, size, style }) => {
    const [scaleValue] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        transform: [{ scale: scaleValue }],
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
                styles.container,
                animatedStyle,
                { width: size, height: size },
                style,
            ]}
        >
            <Image source={source} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        resizeMode: "contain",
        width: "100%",
        height: "100%",
    },
});

export default ControlButton;
