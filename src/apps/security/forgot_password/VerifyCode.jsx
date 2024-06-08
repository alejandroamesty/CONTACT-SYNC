import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { API_URL, API_PORT } from "@env";

import ControlButton from "../../../components/buttons/ControlButton";
import SaveButton from "../../../components/buttons/SaveButton";
import VerificationInput from "../../../components/inputs/VerificationInput";

const VerifyCode = ({ navigation, route }) => {
    const [verificationCode, setVerificationCode] = useState("");
    const { email } = route.params;

    const handleVerifyCode = async () => {
        if (verificationCode.length < 6) {
            console.log("Verification code is required");
            return;
        }

        const data = {
            email: email,
            code: parseInt(verificationCode, 10),
        };

        try {
            const response = await fetch(
                `${API_URL}:${API_PORT}/recoveryCode`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const responseJson = await response.json();

            console.log("Response JSON:", responseJson);

            if (response.status === 200 && responseJson.response) {
                console.log("Verification successful");
                navigation.navigate("ResetPassword", {
                    email,
                    code: verificationCode,
                });
            } else {
                console.log("Verification failed");
                console.log("Error:", responseJson.message);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <ControlButton
                onPress={() => navigation.navigate("ForgotPasswordScreen")}
                source={require("../../../../assets/images/arrow-go-back.png")}
                size={40}
                style={styles.arrow}
            />
            <Text style={styles.title}>Verification code</Text>
            <Text style={styles.message}>
                Enter the 6 digits code that you received on your email
            </Text>
            <SafeAreaView style={styles.verificationCode}>
                <VerificationInput onChange={setVerificationCode} />
            </SafeAreaView>
            <TouchableOpacity style={styles.signUp}>
                <Text style={styles.normalText}>
                    Don't have an account?{" "}
                    <Text style={styles.boldText}>Sign up</Text>
                </Text>
            </TouchableOpacity>
            <SaveButton
                onPress={handleVerifyCode}
                title="Continue"
                style={[
                    styles.continueButton,
                    verificationCode.length < 6 && styles.disabledButton,
                ]}
                disabled={verificationCode.length < 6}
            />
        </View>
    );
};

export default VerifyCode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030B38",
        alignItems: "center",
        justifyContent: "center",
    },
    arrow: {
        position: "absolute",
        height: 40,
        left: 25,
        top: 42,
        color: "#fff",
    },
    image: {
        width: 40,
        height: 40,
    },
    title: {
        position: "absolute",
        width: 246,
        height: 33,
        left: 30,
        top: 101,
        fontFamily: "BROmnySemiBold",
        fontSize: 30,
        lineHeight: 39,
        color: "#fff",
    },
    message: {
        position: "absolute",
        width: 350,
        left: 30,
        top: 153,
        fontFamily: "BROmnyRegular",
        fontSize: 17,
        color: "#8C91B4",
    },
    captionInput: {
        position: "absolute",
        width: 163,
        height: 22,
        left: 32,
        top: 270,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    captionInput2: {
        position: "absolute",
        width: 163,
        height: 22,
        left: 32,
        top: 380,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    forgotPassword: {
        position: "absolute",
        right: 35,
        top: 499,
        fontFamily: "BROmnySemiBold",
        textAlign: "right",
        color: "#FFFFFF",
    },
    forgotPasswordText: {
        fontFamily: "BROmnySemiBold",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    signUp: {
        position: "absolute",
        left: "calc(50% - 414px/2)",
        top: 320,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        textAlign: "center",
        color: "#FFFFFF",
    },
    normalText: {
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    boldText: {
        fontFamily: "BROmnySemiBold",
        fontSize: 15,
        lineHeight: 20,
        color: "#8C91B4",
    },
    emailInput: {
        position: "absolute",
        top: 290,
    },
    passwordInput: {
        position: "absolute",
        top: 416,
    },
    continueButton: {
        position: "absolute",
        top: 380,
    },
    verificationCode: {
        position: "absolute",
        top: 229,
    },
    disabledButton: {
        backgroundColor: "#8C91B4",
    },
});
