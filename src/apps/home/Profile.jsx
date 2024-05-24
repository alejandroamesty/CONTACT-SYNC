import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import ControlButton from "../../components/buttons/ControlButton";

const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("StartScreen")}
            >
                <Text style={styles.text}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;

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
    add: {
        position: "absolute",
        left: 355,
        top: 49,
    },
    text: {
        color: "white",
        fontSize: 20,
    },
});
