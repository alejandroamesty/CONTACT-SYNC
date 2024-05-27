import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import ControlButton from "../../../components/buttons/ControlButton";
import { createStackNavigator } from "@react-navigation/stack";
import EditAccount from "./EditAccount";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import SpecialModal from "../../../components/modals/SpecialModal";
import GrayInput from "../../../components/inputs/GrayInput";

const Stack = createStackNavigator();

const Profile = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const goToEditAccount = () => {
        navigation.navigate("EditAccount");
    };

    const handleLogOut = () => {
        setModalVisible(true);
    };

    const onCancel = () => {
        setModalVisible(false);
    };

    const onNevermind = () => {
        setDeleteModalVisible(false);
    };

    const onAccept = () => {
        setModalVisible(false);
        navigation.navigate("StartScreen");
    };

    const handleDeleteAccount = () => {
        setDeleteModalVisible(true);
    };

    const onDelete = () => {
        setDeleteModalVisible(false);
    };

    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" options={{ headerShown: false }}>
                {() => (
                    <View style={styles.container}>
                        <Text style={styles.title}>Profile</Text>

                        <View style={styles.buttons}>
                            <TouchableOpacity>
                                <View style={styles.card}>
                                    <ControlButton
                                        source={require("../../../../assets/images/Profile/Edit.png")}
                                        size={30}
                                        style={styles.edit}
                                    />
                                    <View>
                                        <View style={styles.userIcon}>
                                            <Text
                                                style={styles.firstNameInitial}
                                            >
                                                {"A"}
                                            </Text>
                                        </View>
                                        <Text style={styles.name}>
                                            Alejandro Ávila
                                        </Text>
                                        <Text style={styles.cardText}>
                                            My Card
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={goToEditAccount}>
                                <View style={styles.button}>
                                    <ControlButton
                                        source={require("../../../../assets/images/Profile/Profile.png")}
                                        size={30}
                                        style={styles.add}
                                    />
                                    <Text style={styles.text}>
                                        Edit account
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleDeleteAccount}>
                                <View style={styles.button}>
                                    <ControlButton
                                        source={require("../../../../assets/images/Profile/Delete.png")}
                                        size={30}
                                        style={styles.add}
                                    />
                                    <Text style={styles.text}>
                                        Delete my account
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <SpecialModal
                                visible={deleteModalVisible}
                                closeModal={onCancel}
                                title="Now just a minute."
                                cancelButtonName="NEVERMIND"
                                doneButtonName="DELETE EVERYTHING"
                                cancelButtonAction={onNevermind}
                                doneButtonAction={onDelete}
                                cancelButtonColor="#7D7D7D"
                                doneButtonColor="#F74040"
                                modalContent={
                                    <View style={styles.inputDelete}>
                                        <GrayInput
                                            placeholder="Email"
                                            style={styles.input}
                                        />
                                        <GrayInput
                                            placeholder="Password"
                                            style={styles.lastInput}
                                        />
                                    </View>
                                }
                            />

                            <TouchableOpacity onPress={handleLogOut}>
                                <View style={styles.button}>
                                    <ControlButton
                                        source={require("../../../../assets/images/Profile/Leave.png")}
                                        size={30}
                                        style={styles.add}
                                    />
                                    <Text style={styles.text}>Log out</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ConfirmationModal
                            visible={modalVisible}
                            image={require("../../../../assets/images/Logout.png")}
                            title="See you soon!"
                            text="You are about to logout. Are you sure this is what you want?"
                            cancelButtonText="CANCEL"
                            acceptButtonText="ACCEPT"
                            onCancel={onCancel}
                            onAccept={onAccept}
                        />
                    </View>
                )}
            </Stack.Screen>
            <Stack.Screen
                name="EditAccount"
                component={EditAccount}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
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
        left: 20,
    },
    edit: {
        position: "absolute",
        right: 20,
        bottom: 38,
    },
    text: {
        color: "white",
        fontSize: 20,
        fontFamily: "BROmnyMedium",
        marginBottom: 2,
    },
    name: {
        color: "white",
        fontSize: 20,
        fontFamily: "BROmnyMedium",
        marginBottom: 2,
        paddingLeft: 22,
    },
    cardText: {
        color: "white",
        fontSize: 16,
        fontFamily: "BROmnyRegular",
        marginBottom: 2,
        paddingLeft: 22,
    },
    card: {
        width: 366,
        height: 86,
        backgroundColor: "#1E264D",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 71,
        marginBottom: 16,
    },
    button: {
        width: 366,
        height: 60,
        backgroundColor: "#1E264D",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 67,
        marginBottom: 16,
    },
    buttons: {
        position: "absolute",
        top: 110,
    },
    userIcon: {
        position: "absolute",
        left: -48,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#0684FE",
        justifyContent: "center",
    },
    firstNameInitial: {
        position: "absolute",
        fontFamily: "BROmnyMedium",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 24,
        alignSelf: "center",
        color: "#FFFFFF",
    },
    input: {
        marginBottom: 12,
    },
    lastInput: {
        marginBottom: 12,
    },
    inputDelete: {
        alignSelf: "center",
    },
});
