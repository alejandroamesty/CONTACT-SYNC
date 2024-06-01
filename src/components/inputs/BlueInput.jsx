import React from "react";
import { TextInput, View, StyleSheet, Image } from "react-native";

const BlueInput = ({
	placeholder,
	onChangeText,
	value,
	style,
	image,
	width = 350,
	height = 55,
	fontSize = 15,
	backgroundColor = "#1E264D",
	type,
}) => {
	return (
		<View style={[styles.container, { width, height }, style]}>
			<TextInput
				style={[styles.input, image && styles.inputWithImage, { fontSize, backgroundColor }]}
				placeholder={placeholder}
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
				onChangeText={(text) => {
					if (onChangeText) onChangeText(text);
				}}
				value={value}
				secureTextEntry={type === "password"}
			/>
			{image && <Image source={image} style={styles.image} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: 350,
		height: 55,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.17)",
		borderRadius: 100,
		paddingHorizontal: 20,
		color: "white",
		height: "100%",
		paddingRight: 55,
	},
	inputWithImage: {
		paddingRight: 55,
	},
	image: {
		position: "absolute",
		width: 23,
		height: 23,
		right: 20,
		top: (55 - 23) / 2,
		zIndex: 1,
	},
});

export default BlueInput;
