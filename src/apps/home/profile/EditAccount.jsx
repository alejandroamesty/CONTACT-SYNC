import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import BlueInput from "../../../components/inputs/BlueInput";

const EditAccount = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit account</Text>
        </View>
    );
};

export default EditAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030B38",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        position: "absolute",
        left: 23,
        top: 49,
        fontFamily: "BROmnySemiBold",
        fontSize: 25,
        color: "#fff",
    },
});
