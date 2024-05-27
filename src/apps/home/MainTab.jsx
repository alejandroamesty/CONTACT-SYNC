import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import HomeIcon from "../../../assets/images/NavBar/Home.png";
import GroupsIcon from "../../../assets/images/NavBar/Groups.png";
import ScannerIcon from "../../../assets/images/NavBar/Scanner.png";
import ProfileIcon from "../../../assets/images/NavBar/Profile.png";

import HomeSelected from "../../../assets/images/NavBar/selected/Home-Selected.png";
import GroupsSelected from "../../../assets/images/NavBar/selected/Groups-Selected.png";
import ScannerSelected from "../../../assets/images/NavBar/selected/Scanner-Selected.png";
import ProfileSelected from "../../../assets/images/NavBar/selected/Profile-Selected.png";

import Home from "./contacts/Home";
import Groups from "./groups/Groups";
import Scanner from "./scanner/Scanner";
import Profile from "./profile/Profile";

const MainTab = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState("Home");

    const renderContent = () => {
        switch (selectedTab) {
            case "Home":
                return <Home />;
            case "Groups":
                return <Groups />;
            case "Scanner":
                return <Scanner />;
            case "Profile":
                return <Profile navigation={navigation} />;
            default:
                return <Home />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {renderContent()}
            </View>
            <View style={styles.tabBarContainer}>
                <View style={styles.tabBar}>
                    {[
                        { name: "Home", icon: HomeIcon, iconSelected: HomeSelected },
                        { name: "Groups", icon: GroupsIcon, iconSelected: GroupsSelected },
                        { name: "Scanner", icon: ScannerIcon, iconSelected: ScannerSelected },
                        { name: "Profile", icon: ProfileIcon, iconSelected: ProfileSelected },
                    ].map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.tab}
                            onPress={() => setSelectedTab(tab.name)}
                        >
                            <View style={selectedTab === tab.name ? styles.selectedTab : styles.tab}>
                                <Image source={selectedTab === tab.name ? tab.iconSelected : tab.icon} style={styles.icon} />
                                {selectedTab === tab.name && (
                                    <Text style={styles.label}>{tab.name}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    tabBarContainer: {
        backgroundColor: "#030B38",
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#1E264D",
        borderColor: "#444B6B",
        borderWidth: 1,
        borderRadius: 100,
        alignItems: "center",
        height: 63,
    },
    tab: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    selectedTab: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        flexDirection: "row",
        height: 40,
        width: 120,
        marginHorizontal: 0,
    },
    icon: {
        width: 23,
        height: 23,
    },
    label: {
        marginLeft: 8,
        fontFamily: "BROmnySemiBold",
        fontSize: 14,
        lineHeight: 18,
        color: "#030B38",
    },
});

export default MainTab;
