import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import ControlButton from "./ControlButton";

const SmallAddButton = ({ onPress, buttonText }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<ControlButton onPress={onPress} source={require("../../../assets/images/AddPhone.png")} size={30} style={styles.icon} />
			<Text style={styles.text}>{buttonText}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: 100,
		height: 40,
		backgroundColor: "#121B49",
		borderRadius: 18,
		marginTop: 12,
		paddingHorizontal: 10,
	},
	icon: {
		marginRight: 10,
	},
	text: {
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		color: "#7D7D7D",
	},
});

export default SmallAddButton;
