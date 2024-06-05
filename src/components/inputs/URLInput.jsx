import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ControlButton from "../buttons/ControlButton";

const URLInput = ({ data, setData, removeData }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(data.typeLabel);
	const [items, setItems] = useState([
		{ id: 1, label: "website", value: "website" },
		{ id: 2, label: "Instagram", value: "Instagram" },
		{ id: 3, label: "Twitter", value: "Twitter" },
		{ id: 4, label: "office", value: "office" },
		{ id: 5, label: "other", value: "other" },
	]);

	useEffect(() => {
		setValue(data.typeLabel);
	}, [data.typeLabel]);

	const getSelectedItem = (value) => items.find((item) => item.value === value);

	return (
		<View style={[styles.container, { zIndex: open ? 1000 : 1 }]}>
			<ControlButton onPress={removeData} source={require("../../../assets/images/Remove.png")} size={18} style={styles.removeIcon} />
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				onChangeValue={(itemValue) => {
					const selectedItem = getSelectedItem(itemValue);
					setData({ ...data, typeLabel: itemValue, type: selectedItem ? selectedItem.id : null });
				}}
				style={styles.picker}
				containerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
				dropDownContainerStyle={[styles.dropDownContainer, { zIndex: 1000 }]}
				textStyle={styles.pickerText}
				placeholder="Select type"
			/>
			<TextInput
				style={styles.textInput}
				placeholder="URL"
				placeholderTextColor="#7D7D7D"
				value={data.url}
				onChangeText={(text) => setData({ ...data, url: text })}
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
		width: 120,
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
		marginLeft: 30,
		width: "100%",
		fontFamily: "BROmnyRegular",
	},
	removeIcon: {
		width: 20,
		height: 20,
	},
});

export default URLInput;
