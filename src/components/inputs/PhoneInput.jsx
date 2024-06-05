import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ControlButton from "../buttons/ControlButton";

const PhoneInput = ({ phone, setPhone, removePhone }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(phone.type);
	const [items, setItems] = useState([
		{ id: 1, label: "home", value: "home" },
		{ id: 2, label: "mobile", value: "mobile" },
		{ id: 3, label: "work", value: "work" },
	]);

	useEffect(() => {
		setValue(phone.type);
	}, [phone.type]);

	const getSelectedItem = (value) => items.find((item) => item.value === value);

	return (
		<View style={[styles.phoneInputContainer, { zIndex: open ? 1000 : 1 }]}>
			<ControlButton onPress={removePhone} source={require("../../../assets/images/Remove.png")} size={18} style={styles.removeIcon} />
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				onChangeValue={(itemValue) => {
					setValue(itemValue);
					const selectedItem = getSelectedItem(itemValue);
					setPhone({ ...phone, type: itemValue, phoneType: selectedItem ? selectedItem.id : null });
				}}
				style={styles.picker}
				containerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
				dropDownContainerStyle={[styles.dropDownContainer, { zIndex: 1000 }]}
				textStyle={styles.pickerText}
				placeholder="Select type"
			/>
			<TextInput
				style={styles.countryCodeInput}
				placeholder="+"
				placeholderTextColor="#7D7D7D"
				value={phone.phoneCode}
				onChangeText={(text) => setPhone({ ...phone, phoneCode: text })}
			/>
			<TextInput
				style={styles.phoneNumberInput}
				placeholder="Phone Number"
				placeholderTextColor="#7D7D7D"
				value={phone.phoneNumber}
				onChangeText={(text) => setPhone({ ...phone, phoneNumber: text })}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	phoneInputContainer: {
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
		width: 100,
	},
	dropDownContainer: {
		borderColor: "#EDEEF0",
	},
	pickerText: {
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		color: "#7D7D7D",
	},
	countryCodeInput: {
		width: 30,
		marginHorizontal: 5,
		fontFamily: "BROmnyRegular",
	},
	phoneNumberInput: {
		flex: 1,
		marginHorizontal: 10,
		fontFamily: "BROmnyRegular",
	},
	removeIcon: {
		width: 20,
		height: 20,
	},
});

export default PhoneInput;
