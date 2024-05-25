import React, { useState, useMemo } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import ControlButton from "../../components/buttons/ControlButton";
import BlueInput from "../../components/inputs/BlueInput";
import GroupCard from "../../components/buttons/GroupCard";

const groups = [
    {
        id: "1",
        iconName: "Emergency",
        groupName: "Emergency",
        contactCount: 5,
        backgroundColor: "rosado",
    },
    {
        id: "2",
        iconName: "Favorites",
        groupName: "Favorites",
        contactCount: 10,
        backgroundColor: "azul",
    },
    {
        id: "3",
        iconName: "Group",
        groupName: "University",
        contactCount: 20,
        backgroundColor: "verde",
    },
    {
        id: "4",
        iconName: "Group",
        groupName: "Family",
        contactCount: 15,
        backgroundColor: "amarillo",
    },
    {
        id: "5",
        iconName: "Group",
        groupName: "Work",
        contactCount: 5,
        backgroundColor: "morado",
    },
    {
        id: "6",
        iconName: "Group",
        groupName: "Restaurants",
        contactCount: 10,
        backgroundColor: "naranja",
    },
    {
        id: "7",
        iconName: "Group",
        groupName: "Musicians",
        contactCount: 3,
        backgroundColor: "rosado",
    },
];

const Groups = () => {
    const [searchText, setSearchText] = useState("");

    const filteredGroups = useMemo(
        () =>
            groups.filter((group) =>
                group.groupName.toLowerCase().includes(searchText.toLowerCase())
            ),
        [searchText]
    );

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
                value={searchText}
                onChangeText={setSearchText}
                backgroundColor="#030B38"
            />

            <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.groupCards}>
                    {filteredGroups.map((group) => (
                        <GroupCard
                            key={group.id}
                            iconName={group.iconName}
                            groupName={group.groupName}
                            contactCount={group.contactCount}
                            backgroundColor={group.backgroundColor}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Groups;

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
    searchInput: {
        position: "absolute",
        top: 104,
    },
    add: {
        position: "absolute",
        left: 355,
        top: 49,
    },
    scrollViewContainer: {
        flex: 1,
        marginTop: 190,
        width: "100%",
    },
    groupCards: {
        maxWidth: 800,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 25,
    },
});
