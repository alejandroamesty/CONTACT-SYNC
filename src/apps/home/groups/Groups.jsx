import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";

import ControlButton from "../../../components/buttons/ControlButton";
import BlueInput from "../../../components/inputs/BlueInput";
import GroupCard from "../../../components/buttons/GroupCard";
import CustomModal from "../../../components/modals/CustomModal";
import Carousel from "../../../components/Carousel";
import GrayInput from "../../../components/inputs/GrayInput";
import List from "../../../components/lists/List";

import GroupDetail from "./GroupDetail";

const Stack = createStackNavigator();

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

const data = [
    { id: 1, name: "Alejandro Ávila", checked: true },
    { id: 2, name: "Victor Ávila", checked: true },
    { id: 3, name: "Américo González", checked: true },
    { id: 4, name: "Camila Borges", checked: true },
    { id: 5, name: "José Bracho", checked: true },
    { id: 6, name: "Bruno Melga", checked: false },
    { id: 7, name: "Carlos Arámbulo", checked: true },
    { id: 8, name: "Camila Borges", checked: true },
    { id: 9, name: "Colegio Claret", checked: true },
    { id: 10, name: "Luis Crespo", checked: false },
];

const Groups = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Groups">
                <Stack.Screen name="Groups" options={{ headerShown: false }}>
                    {(props) => <GroupsScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen
                    name="GroupDetail"
                    component={GroupDetail}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const GroupsScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [secondModalVisible, setSecondModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const openSecondModal = () => {
        setSecondModalVisible(true);
    };

    const closeSecondModal = () => {
        setSecondModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Groups</Text>

            <ControlButton
                source={require("../../../../assets/images/Add.png")}
                size={36}
                style={styles.add}
                onPress={openModal}
            />
            <BlueInput
                style={styles.searchInput}
                placeholder="Search"
                width={366}
                height={60}
                fontSize={18}
                image={require("../../../../assets/images/Search.png")}
                backgroundColor="#030B38"
            />

            <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.groupCards}>
                    {groups.map((group) => (
                        <GroupCard
                            key={group.id}
                            iconName={group.iconName}
                            groupName={group.groupName}
                            contactCount={group.contactCount}
                            backgroundColor={group.backgroundColor}
                            onPress={() =>
                                navigation.navigate("GroupDetail", { group })
                            }
                        />
                    ))}
                </ScrollView>
            </View>

            <CustomModal
                visible={modalVisible}
                closeModal={closeModal}
                title="Add members"
                cancelButtonName="Cancel"
                doneButtonName="Next"
                cancelButtonAction={closeModal}
                doneButtonAction={openSecondModal}
                cancelButtonColor="#7D7D7D"
                doneButtonColor="#33BE99"
                modalContent={
                    <View style={styles.modalContainer}>
                        <GrayInput
                            placeholder="Search name or number"
                            image={require("../../../../assets/images/Search.png")}
                        />
                        <View style={styles.list}>
                            <List data={data} />
                        </View>
                    </View>
                }
            />

            <CustomModal
                visible={secondModalVisible}
                closeModal={closeSecondModal}
                title="New group"
                cancelButtonName="Back"
                doneButtonName="Create"
                cancelButtonAction={closeSecondModal}
                doneButtonAction={closeSecondModal}
                cancelButtonColor="#7D7D7D"
                doneButtonColor="#33BE99"
                modalContent={
                    <View>
                        <View style={styles.carouselContainer}>
                            <Carousel
                                image={require("../../../../assets/images/GroupCard/Group.png")}
                            />
                        </View>
                        <View style={styles.inputContact}>
                            <GrayInput
                                placeholder="Group name"
                                style={styles.input}
                            />
                            <GrayInput
                                placeholder="Description"
                                style={styles.lastInput}
                                height={78}
                                borderRadius={18}
                            />
                        </View>
                    </View>
                }
            />
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
    carouselContainer: {
        marginLeft: -20,
        marginRight: -20,
    },
    inputContact: {
        marginTop: 20,
        alignSelf: "center",
    },
    input: {
        marginBottom: 12,
    },
    lastInput: {
        marginBottom: 232,
    },
    userIcon: {
        position: "absolute",
        right: 25,
        top: 214,
        width: 48,
        height: 48,
        top: 55,
        borderRadius: 24,
        backgroundColor: "#0684FE",
        justifyContent: "center",
    },
    nameInitial: {
        position: "absolute",
        fontFamily: "BROmnyMedium",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 24,
        alignSelf: "center",
        color: "#FFFFFF",
    },
    listContainer: {
        flex: 1,
        backgroundColor: "#030B38",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        alignItems: "center",
    },
    list: {
        width: 415,
        height: 500,
        marginTop: 15,
    },
});
