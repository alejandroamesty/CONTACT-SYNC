import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BlueInput from "../../../components/inputs/BlueInput";
import SaveButton from "../../../components/buttons/SaveButton";

const EditAccount = ({ navigation }) => {
    const handleSaveChanges = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit account</Text>

            <Text style={styles.captionSection}>Email</Text>
            <BlueInput
                placeholder="Enter your email"
                style={styles.emailInput}
                width={366}
            />

            <Text style={styles.captionSection2}>Password</Text>

            <Text style={styles.captionInput1}>Current password</Text>
            <BlueInput
                placeholder="********"
                style={styles.currentInput}
                width={366}
            />

            <Text style={styles.captionInput2}>New password</Text>
            <BlueInput
                placeholder="Enter your password"
                style={styles.passwordInput}
                width={366}
            />

            <Text style={styles.captionInput3}>Confirm password</Text>
            <BlueInput
                placeholder="Confirm your password"
                style={styles.confirmInput}
                width={366}
            />

            <SaveButton
                title="Save changes"
                style={styles.saveButton}
                onPress={() => handleSaveChanges()}
                width={366}
            />
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
    captionSection: {
        position: "absolute",
        left: 23,
        top: 100,
        fontFamily: "BROmnyMedium",
        fontSize: 18,
        color: "#fff",
    },
    emailInput: {
        position: "absolute",
        left: 23,
        top: 142,
    },
    captionSection2: {
        position: "absolute",
        left: 23,
        top: 213,
        fontFamily: "BROmnyMedium",
        fontSize: 18,
        color: "#fff",
    },
    captionInput1: {
        position: "absolute",
        left: 23,
        top: 255,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        color: "#fff",
    },
    currentInput: {
        position: "absolute",
        left: 23,
        top: 285,
    },
    captionInput2: {
        position: "absolute",
        left: 23,
        top: 357,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        color: "#fff",
    },
    passwordInput: {
        position: "absolute",
        left: 23,
        top: 393,
    },
    captionInput3: {
        position: "absolute",
        left: 23,
        top: 465,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        color: "#fff",
    },
    confirmInput: {
        position: "absolute",
        left: 23,
        top: 501,
    },
    saveButton: {
        position: "absolute",
        left: 23,
        top: 580,
    },
});
