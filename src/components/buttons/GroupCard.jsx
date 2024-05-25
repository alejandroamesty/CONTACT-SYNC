import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";

const GroupCard = ({ iconName, groupName, contactCount, backgroundColor }) => {
    const iconSource = {
        Favorites: require("../../../assets/images/GroupCard/Favorites.png"),
        Emergency: require("../../../assets/images/GroupCard/Emergency.png"),
        Group: require("../../../assets/images/GroupCard/Group.png"),
    }[iconName];

    const backgroundColors = {
        rosado: ["#FF6189", "#FF4574"],
        naranja: ["#FF906D", "#FF7246"],
        amarillo: ["#FFD25A", "#FFAC20"],
        azul: ["#3EA0FF", "#0684FE"],
        verde: ["#55DDC2", "#33BE99"],
        morado: ["#FF77F1", "#FF38EB"],
    };

    const gradientColors =
        backgroundColors[backgroundColor] || backgroundColors["rosado"];

    const [scaleValue] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.timing(scaleValue, {
            toValue: 0.9,
            duration: 150,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 150,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
        >
            <Animated.View
                style={[
                    styles.groupCard,
                    {
                        backgroundColor: gradientColors[0],
                        transform: [{ scale: scaleValue }],
                    },
                ]}
            >
                <Image source={iconSource} style={styles.icon} />
                <Text style={styles.groupName}>{groupName}</Text>
                <Text style={styles.contactCount}>• {contactCount} contacts</Text>
                <Image
                    source={require("../../../assets/images/GroupCard/Plus.png")}
                    style={styles.addIcon}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default GroupCard;

const styles = StyleSheet.create({
    groupCard: {
        width: 172,
        height: 139,
        borderRadius: 20,
        marginBottom: 20,
        padding: 15,
        justifyContent: "flex-start",
    },
    icon: {
        width: 26,
        height: 26,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    groupName: {
        fontFamily: "BR Omny",
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
        marginBottom: 5,
        textAlign: "left",
    },
    contactCount: {
        fontFamily: "BR Omny",
        fontSize: 14,
        fontWeight: "400",
        color: "#FFFFFF",
        marginBottom: 10,
        textAlign: "left",
    },
    addIcon: {
        width: 20,
        height: 20,
        alignSelf: "flex-start",
    },
});
