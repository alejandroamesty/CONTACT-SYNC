import { View, Text } from "react-native";
import React from "react";
import ControlButton from "../../components/buttons/ControlButton";
import BlueInput from "../../components/inputs/BlueInput";

const Groups = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Groups</Text>

            <ControlButton
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
                backgroundColor="#030B38"
            />
        </View>
    );
};

export default Groups;

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
    searchInput: {
        position: "absolute",
        top: 104,
    },
    add: {
        position: "absolute",
        left: 355,
        top: 49,
    },
};
