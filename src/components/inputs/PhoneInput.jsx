import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ControlButton from "../buttons/ControlButton";

const PhoneInput = ({ phone, setPhone, removePhone }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(phone.type);
    const [items, setItems] = useState([
        { label: "home", value: "home" },
        { label: "mobile", value: "mobile" },
        { label: "work", value: "work" },
    ]);

    useEffect(() => {
        setValue(phone.type);
    }, [phone.type]);

    return (
        <View style={styles.phoneInputContainer}>
            <ControlButton
                onPress={removePhone}
                source={require("../../../assets/images/Remove.png")}
                size={18}
                style={styles.removeIcon}
            />
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(itemValue) =>
                    setPhone({ ...phone, type: itemValue })
                }
                style={styles.picker}
                containerStyle={{ width: 100 }}
                dropDownContainerStyle={styles.dropDownContainer}
                textStyle={styles.pickerText}
            />
            <TextInput
                style={styles.countryCodeInput}
                placeholder="+"
                placeholderTextColor="#7D7D7D"
                onChangeText={(text) =>
                    setPhone({ ...phone, countryCode: text })
                }
            />
            <TextInput
                style={styles.phoneNumberInput}
                placeholder="Phone Number"
                placeholderTextColor="#7D7D7D"
                value={phone.number}
                onChangeText={(text) => setPhone({ ...phone, number: text })}
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
    picker: {
        borderColor: "#EDEEF0",
        backgroundColor: "#EDEEF0",
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
        textAlign: "center",
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
