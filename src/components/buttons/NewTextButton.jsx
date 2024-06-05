import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const NewTextButton = ({ onPress, buttonText }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.text}>{buttonText}</Text>
		</TouchableOpacity>
	);
};

export default NewTextButton;

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		borderRadius: 18,
		marginTop: 12,
		paddingHorizontal: 10,
	},
	text: {
		fontFamily: "BROmnyRegular",
		fontSize: 25,
		padding: 10,
		color: "#0AA5FF",
	},
});
