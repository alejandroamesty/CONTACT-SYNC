import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GroupDetail = ({ route }) => {
    const { groupName } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.groupName}>{groupName}</Text>
        </View>
    );
};

export default GroupDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030B38",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    groupName: {
        fontSize: 24,
        color: "#FFF",
    },
});
