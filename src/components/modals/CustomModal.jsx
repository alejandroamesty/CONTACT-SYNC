import React from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";

const CustomModal = ({
    visible,
    closeModal,
    title,
    cancelButtonName,
    doneButtonName,
    cancelButtonAction,
    doneButtonAction,
    cancelButtonColor,
    doneButtonColor,
    modalContent,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={cancelButtonAction}>
                            <Text
                                style={[
                                    styles.buttonLeft,
                                    { color: cancelButtonColor },
                                ]}
                            >
                                {cancelButtonName}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={doneButtonAction}>
                            <Text
                                style={[
                                    styles.buttonRight,
                                    { color: doneButtonColor },
                                ]}
                            >
                                {doneButtonName}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.modalText}>{title}</Text>
                    {modalContent}
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    buttonLeft: {
        fontSize: 17,
        fontFamily: "BROmnyMedium",
        left: 10,
    },
    buttonRight: {
        fontSize: 17,
        fontFamily: "BROmnyMedium",
        right: 10,
    },
    modalText: {
        fontSize: 21,
        fontFamily: "BROmnySemiBold",
        marginBottom: 20,
        marginTop: 36,
        left: 10,
    },
});
