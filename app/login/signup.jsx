import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import BlueInput from "../../components/BlueInput";
import SaveButton from "../../components/SaveButton";

const SignIn = () => {
    return (
        <View style={styles.container}>
            <Link href="/" style={styles.arrow}>
                <Image
                    source={require('../../assets/images/arrow-go-back.png')}
                    style={styles.image}
                />
            </Link>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>Welcome aboard.</Text>
            <Text style={styles.undertitle}>Ready to begin?</Text>

            <Text style={styles.captionInput}>Email</Text>
            <BlueInput placeholder="Enter your email" style={styles.emailInput}/>
            <Text style={styles.captionInput2}>Password</Text>
            <BlueInput placeholder="Enter your password" style={styles.passwordInput}/>
            <Text style={styles.captionInput3}>Confirm password</Text>
            <BlueInput placeholder="Confirm your password" style={styles.confirmInput}/>
            
            <SaveButton title="Sign up" style={styles.saveButton}/>

            <Link href="/login/signin" style={styles.signUp}>
                <Text style={styles.normalText}>
                    Already have an account? <Text style={styles.boldText}>Sign in</Text>
                </Text>
            </Link>
        </View>
    );
};

export default SignIn;

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
        width: 350,
        height: 33,
        left: 30,
        top: 101,
        fontFamily: "BROmnySemiBold",
        fontSize: 30,
        lineHeight: 39,
        color: "#fff",
    },
    subtitle: {
        position: "absolute",
        width: 246,
        height: 33,
        left: 30,
        top: 149,
        fontFamily: "BROmnyRegular",
        fontSize: 30,
        lineHeight: 39,
        color: "#8C91B4",
    },
    undertitle: {
        position: "absolute",
        width: 290,
        height: 33,
        left: 30,
        top: 188,
        fontFamily: "BROmnyRegular",
        fontSize: 30,
        lineHeight: 39,
        color: "#8C91B4",
    },
    captionInput: {
        position: "absolute",
        width: 163,
        height: 22,
        left: 32,
        top: 261,
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
        top: 371,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    captionInput3: {
        position: "absolute",
        width: 163,
        height: 22,
        left: 32,
        top: 481,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        color: "#FFFFFF",
    },
    forgotPassword: {
        position: "absolute",
        width: 163,
        height: 22,
        left: 216,
        top: 499,
        fontFamily: "BROmnySemiBold",
        fontSize: 15,
        lineHeight: 20,
        textAlign: "right",
        color: "#FFFFFF",
    },
    signUp: {
        position: "absolute",
        width: 414,
        height: 22,
        left: "calc(50% - 414px/2)",
        top: 692,
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        lineHeight: 20,
        textAlign: "center",
        color: "#FFFFFF",
    },
    boldText: {
        fontFamily: "BROmnySemiBold",
        fontSize: 15,
        lineHeight: 20,
        color: "#8C91B4",
    },
    emailInput: {
        position: 'absolute',
        top: 297,
    },
    passwordInput: {
        position: 'absolute',
        top: 407,
    },
    confirmInput: {
        position: 'absolute',
        top: 517,
    },
    saveButton: {
        position: "absolute",
        top: 612,
    },
});
