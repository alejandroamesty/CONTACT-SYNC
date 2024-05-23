import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "react-native";
import React from "react";
import { Link } from "expo-router";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const Home = () => {
    const [fontsLoaded] = useFonts({
        BROmnyRegular: require("../assets/fonts/BROmny-Regular.otf"),
        BROmnyMedium: require("../assets/fonts/BROmny-Medium.otf"),
        BROmnySemiBold: require("../assets/fonts/BROmny-SemiBold.otf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.normalText}>
                contact<Text style={styles.boldText}>sync</Text>
            </Text>
            <View style={styles.bgButtons}>
                <View style={styles.bgSignIn}>
                    <Link href="/login/signin" style={styles.link}>
                        <Text style={styles.signInText}>Sign in</Text>
                    </Link>
                </View>
                <View style={styles.bgSignUp}>
                <Link href="/login/signup" style={styles.link}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </Link>
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030B38",
        alignItems: "center",
        justifyContent: "center",
    },
    normalText: {
        position: "absolute",
        width: 194,
        height: 50,
        left: 120,
        top: 343,
        fontFamily: "BROmnyRegular",
        fontSize: 32,
        color: "#fff",
    },
    boldText: {
        fontFamily: "BROmnySemiBold",
        fontSize: 32,
        color: "#fff",
    },
    signInText: {
        position: "absolute",
        width: 185,
        height: 27,
        fontFamily: "BROmnySemiBold",
        fontSize: 18,
        lineHeight: 24,
        color: "#FFFFFF",
        zIndex: 2,
    },
    signUpText: {
        position: "absolute",
        width: 370,
        height: 27,
        fontFamily: "BROmnySemiBold",
        fontSize: 18,
        lineHeight: 24,
        color: "#FFFFFF",
        zIndex: 2,
    },
    bgSignIn: {
        width: 185,
        height: 58,
        backgroundColor: "#121B4A",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    bgSignUp: {
        width: 185,
        height: 58,
        backgroundColor: "#1E264D",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    bgButtons: {
        flexDirection: "row",
        width: 370,
        height: 58,
        top: 318,
        borderRadius: 20,
        backgroundColor: "#1E264D",
        alignItems: "center",
    },
});