import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#030B38",
    },
    text: {
        color: "white",
        fontSize: 20,
    },
});