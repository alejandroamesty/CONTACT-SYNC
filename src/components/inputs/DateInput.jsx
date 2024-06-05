import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import ControlButton from "../buttons/ControlButton";
import CustomCalendarModal from "../modals/CalendarModal";

const DateInput = ({ data, setData, removeData }) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(data.type);
    const [selectedDate, setSelectedDate] = useState(data.date);
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState([
        { id: 1, label: "birthday", value: "birthday" },
        { id: 2, label: "anniversary", value: "anniversary" },
        { id: 3, label: "other", value: "other" },
    ]);

    useEffect(() => {
        setSelectedValue(data.type);
    }, [data.type]);

    useEffect(() => {
        setSelectedDate(data.date);
    }, [data.date]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData({ ...data, date });
        setModalVisible(false);
    };

    const formatDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
    };

    const getSelectedItem = (value) =>
        items.find((item) => item.value === value);

    return (
        <View style={[styles.container, { zIndex: open ? 1000 : 1 }]}>
            <ControlButton
                onPress={removeData}
                source={require("../../../assets/images/Remove.png")}
                size={18}
                style={styles.removeIcon}
            />
            <DropDownPicker
                open={open}
                value={selectedValue}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedValue}
                onChangeValue={(itemValue) => {
                    setSelectedValue(itemValue);
                    const selectedItem = getSelectedItem(itemValue);
                    setData({
                        ...data,
                        type: itemValue,
                        typeId: selectedItem ? selectedItem.id : null,
                    });
                }}
                style={styles.picker}
                containerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                dropDownContainerStyle={[
                    styles.dropDownContainer,
                    { zIndex: 1000 },
                ]}
                textStyle={styles.pickerText}
                placeholder="Select type"
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
