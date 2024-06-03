import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ControlButton from "../buttons/ControlButton";

const ComboInput = ({ options, value, onChangeText, onRemove, placeholder, index }) => {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(value);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const handleSelectedValueChange = (newValue) => {
		setSelectedValue(newValue);
		onChangeText(newValue);
	};

	const handleTextInputChange = (text) => {
		if (!options.some((option) => option.value === text.toLowerCase())) {
			onChangeText(text);
		}
	};

	return (
		<View style={[styles.container, { zIndex: open ? 1000 : 1 }]}>
			<ControlButton
				onPress={() => onRemove(index)}
				source={require("../../../assets/images/Remove.png")}
				size={18}
				style={styles.removeIcon}
			/>
			<DropDownPicker
				open={open}
				value={selectedValue}
				items={options}
				setOpen={setOpen}
				setValue={handleSelectedValueChange}
				onChangeValue={handleSelectedValueChange}
				style={styles.picker}
				containerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
				dropDownContainerStyle={[styles.dropDownContainer, { zIndex: 1000 }]}
				textStyle={styles.pickerText}
				placeholder={placeholder}
			/>
			<TextInput
				style={styles.textInput}
				placeholder={placeholder}
				placeholderTextColor="#7D7D7D"
				value={value}
				onChangeText={handleTextInputChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 12,
		backgroundColor: "#EDEEF0",
		borderRadius: 18,
		paddingHorizontal: 10,
	},
	dropdownContainer: {
		flex: 1,
	},
	picker: {
		borderColor: "#EDEEF0",
		backgroundColor: "#EDEEF0",
		width: "100%",
	},
	dropDownContainer: {
		borderColor: "#EDEEF0",
	},
	pickerText: {
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		color: "#7D7D7D",
	},
	textInput: {
		flex: 2,
		marginHorizontal: 10,
		fontFamily: "BROmnyRegular",
	},
	removeIcon: {
		width: 20,
		height: 20,
	},
});

export default ComboInput;
