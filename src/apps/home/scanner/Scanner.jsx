import { View, Text } from "react-native";
import React from "react";
import ControlButton from "../../../components/buttons/ControlButton";
import BlueInput from "../../../components/inputs/BlueInput";

const Scanner = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scanner</Text>

            <ControlButton
                source={require("../../../../assets/images/Scanner.png")}
                size={36}
                style={styles.add}
            />
        </View>
    );
};

export default Scanner;

const styles = {
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
    add: {
        position: "absolute",
        left: 355,
        top: 49,
    },
};
