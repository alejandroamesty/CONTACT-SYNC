import React, { useState } from "react";
import { TextInput, View, StyleSheet, Image } from "react-native";

const GrayInput = ({ placeholder, onChangeText, defaultValue, style, image, width = 360, height = 40, fontSize = 15, borderRadius = 18 }) => {
	const [value, setValue] = useState(defaultValue);
	const multiline = height > 40;
	return (
		<View style={[styles.container, { width, height, borderRadius }, style]}>
			<TextInput
				style={[styles.input, image && styles.inputWithImage, { fontSize }, multiline && styles.multilineInput]}
				placeholder={placeholder}
				placeholderTextColor="#7D7D7D"
				onChangeText={(text) => {
					if (onChangeText) onChangeText(text);
					setValue(text);
				}}
				value={value}
				multiline={multiline}
				numberOfLines={multiline ? undefined : 1}
			/>
			{image && <Image source={image} style={styles.image} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: 360,
		height: 40,
		overflow: "hidden",
	},
	input: {
		flex: 1,
		backgroundColor: "#EDEEF0",
		paddingHorizontal: 20,
		fontFamily: "BROmnyRegular",
		color: "black",
		height: "100%",
		paddingRight: 16,
	},
	inputWithImage: {
		paddingRight: 16,
	},
	multilineInput: {
		paddingTop: 16,
	},
	image: {
		position: "absolute",
		width: 20,
		height: 20,
		right: 20,
		top: (40 - 20) / 2,
		zIndex: 1,
	},
});

export default GrayInput;
