import React from "react";
import {
    View,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
} from "react-native";
import { BlurView } from "expo-blur";
import CalendarPicker from "react-native-calendar-picker";

const CustomCalendarModal = ({
    visible,
    onClose,
    onDateSelect,
    selectedDate,
}) => {
    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <BlurView style={styles.overlay} intensity={100} tint="dark">
                <View style={styles.modalContainer}>
                    <CalendarPicker
                        selectedStartDate={selectedDate}
                        onDateChange={onDateSelect}
                        width={Dimensions.get("window").width * 0.8}
                        height={Dimensions.get("window").height * 0.6}
                        previousTitle="Prev"
                        nextTitle="Next"
                        selectedDayStyle={{
                            backgroundColor: "#0AA5FF",
                        }}
                        textStyle={styles.customFont}
                        initialDate={selectedDate}
                    />
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    );
};

export default CustomCalendarModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.52,
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 20,
        elevation: 5,
    },
    closeButton: {
        backgroundColor: "#0AA5FF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    closeButtonText: {
        color: "#fff",
        fontFamily: "BROmnyRegular",
        fontSize: 16,
    },
    customFont: {
        fontSize: 16,
        color: "#333",
        fontFamily: "BROmnyRegular",
    },
});
