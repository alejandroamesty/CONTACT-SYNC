import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const GroupCard = ({ iconName, groupName, contactCount, backgroundColor }) => {
	const navigation = useNavigation();

	const iconSource = {
		Favorites: require("../../../assets/images/GroupCard/Favorites.png"),
		Emergency: require("../../../assets/images/GroupCard/Emergency.png"),
		Group: require("../../../assets/images/GroupCard/Group.png"),
	}[iconName];

	const backgroundColors = {
		1: ["#FFD25A", "#FFAC20"],
		2: ["#FF906D", "#FF7246"],
		3: ["#FF6189", "#FF4574"],
		4: ["#FF77F1", "#FF38EB"],
		5: ["#3EA0FF", "#0684FE"],
		6: ["#55DDC2", "#33BE99"],
	};

	const gradientColors = backgroundColors[backgroundColor] || backgroundColors[1];

	const [scaleValue] = useState(new Animated.Value(1));

	const handlePressIn = () => {
		Animated.timing(scaleValue, {
			toValue: 0.9,
			duration: 150,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.timing(scaleValue, {
			toValue: 1,
			duration: 150,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}).start();
	};

	const handlePress = () => {
		navigation.navigate("GroupDetail", { groupName });
	};

	return (
		<TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handlePress} activeOpacity={0.8}>
			<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
				<LinearGradient colors={gradientColors} style={styles.groupCard}>
					<Image source={iconSource} style={styles.icon} />
					<Text style={styles.groupName}>{groupName}</Text>
					<Text style={styles.contactCount}>• {contactCount} contacts</Text>
					<Image source={require("../../../assets/images/GroupCard/Plus.png")} style={styles.addIcon} />
				</LinearGradient>
			</Animated.View>
		</TouchableOpacity>
	);
};

export default GroupCard;

var { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	groupCard: {
		width: 0.4 * width,
		height: 139,
		borderRadius: 20,
		marginBottom: 20,
		padding: 15,
		justifyContent: "flex-start",
	},
	icon: {
		width: 26,
		height: 26,
		marginBottom: 10,
		alignSelf: "flex-start",
	},
	groupName: {
		fontFamily: "BROmnySemiBold",
		fontSize: 18,
		color: "#FFFFFF",
		marginBottom: 5,
		textAlign: "left",
	},
	contactCount: {
		fontFamily: "BROmnyMedium",
		fontSize: 14,
		color: "#FFFFFF",
		marginBottom: 10,
		textAlign: "left",
	},
	addIcon: {
		width: 20,
		height: 20,
		alignSelf: "flex-start",
	},
});
