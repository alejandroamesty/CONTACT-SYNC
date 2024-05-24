import { StyleSheet, View, Text } from "react-native";
import React from "react";
import BlueInput from "../../components/inputs/BlueInput";
import ControlButton from "../../components/buttons/ControlButton";

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello</Text>
            <Text style={styles.subtitle}>Alejandro Ávila</Text>

            <Text style={styles.undertitle}>Contacts</Text>

            <ControlButton
                onPress={() => navigation.navigate("StartScreen")}
                source={require("../../../assets/images/Add.png")}
                size={36}
                style={styles.add}
            />

            <BlueInput
                style={styles.searchInput}
                placeholder="Search"
                width={366}
                height={60}
                fontSize={18}
                image={require("../../../assets/images/Search.png")}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#030B38",
    },
    title: {
        position: "absolute",
        width: 51,
        height: 27,
        left: 23,
        top: 49,
        fontFamily: "BROmnySemiBold",
        fontSize: 18,
        color: "#fff",
    },
    subtitle: {
        position: "absolute",
        width: 184,
        height: 33,
        left: 23,
        top: 70,
        fontFamily: "BROmnySemiBold",
        fontSize: 25,
        color: "#fff",
    },
    undertitle: {
        position: "absolute",
        width: 184,
        height: 33,
        left: 23,
        top: 217,
        fontFamily: "BROmnySemiBold",
        fontSize: 25,
        color: "#fff",
    },
    searchInput: {
        position: "absolute",
        top: 129,
    },
    add: {
        position: "absolute",
        left: 351,
        top: 214,
    },
});
