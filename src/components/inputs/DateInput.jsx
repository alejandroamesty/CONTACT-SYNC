import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import ControlButton from "../buttons/ControlButton";
import CustomCalendarModal from "../modals/CalendarModal";

const DateInput = ({
    options = [],
    value = "",
    onRemove = () => {},
    placeholder = "Seleccione una opción",
    index = 0,
}) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [selectedDate, setSelectedDate] = useState(value);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setSelectedValue(value);
        setSelectedDate(value);
    }, [value]);

    const handleSelectedValueChange = (newValue) => {
        setSelectedValue(newValue);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setModalVisible(false);
    };    

    const formatDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
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
                items={options.map((option) => ({
                    label: option.label,
                    value: option.value,
                }))}
                setOpen={setOpen}
                setValue={setSelectedValue}
                onChangeValue={handleSelectedValueChange}
                style={styles.picker}
                containerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                dropDownContainerStyle={[
                    styles.dropDownContainer,
                    { zIndex: 1000 },
                ]}
                textStyle={styles.pickerText}
                placeholder={placeholder}
            />
            <CustomCalendarModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onDateSelect={handleDateChange}
                selectedDate={selectedDate}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Fecha"
                placeholderTextColor="#7D7D7D"
                value={selectedDate ? formatDate(selectedDate) : ""}
                editable={false}
            />
            <ControlButton
                onPress={() => setModalVisible(true)}
                source={require("../../../assets/images/Calendar.png")}
                size={18}
                style={styles.calendarIcon}
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    calendarIcon: {
        width: 20,
        height: 20,
    },
    picker: {
        borderColor: "#EDEEF0",
        backgroundColor: "#EDEEF0",
        width: 125,
    },
    dropdownContainer: {
        flex: 1,
        zIndex: 1000,
    },
    dropDownContainer: {
        borderColor: "#EDEEF0",
        zIndex: 1000,
        width: 100,
    },
    pickerText: {
        fontFamily: "BROmnyRegular",
        fontSize: 15,
        color: "#7D7D7D",
    },
    textInput: {
        flex: 2,
        marginHorizontal: 10,
        marginLeft: 50,
        fontFamily: "BROmnyRegular",
    },
});

export default DateInput;
