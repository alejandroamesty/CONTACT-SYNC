import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ContactDetail = ({ route }) => {
    const { contact } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {contact.firstName} {contact.lastName}
            </Text>
            <Text style={styles.phone}>{contact.phone}</Text>
        </View>
    );
};

export default ContactDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030B38",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    name: {
        fontSize: 24,
        color: "#FFF",
    },
    phone: {
        fontSize: 18,
        color: "#FFF",
    },
});
