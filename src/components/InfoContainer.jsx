import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoContainer = ({
    name,
    info,
    backgroundColor = "#121B49",
    nameColor = "#737791",
    infoColor = "#FFFFFF",
    style,
}) => {
    return (
        <View style={[styles.container, style, { backgroundColor }]}>
            <Text style={[styles.name, { color: nameColor }]}>{name}</Text>
            <Text style={[styles.info, { color: infoColor }]}>{info}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 56,
        borderRadius: 18,
        justifyContent: "center",
        marginBottom: 10,
    },
    name: {
        fontFamily: "BROmnyRegular",
        fontSize: 12,
        lineHeight: 16,
        left: 16,
        marginBottom: 4,
    },
    info: {
        fontFamily: "BROmnyMedium",
        fontSize: 15,
        left: 16,
    },
});

export default InfoContainer;
