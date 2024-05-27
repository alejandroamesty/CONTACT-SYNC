import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity,
    Image,
} from "react-native";

const SpecialModal = ({
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
    console.log("modalContent:", modalContent);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image
                        source={require("../../../assets/images/DeleteModal.png")}
                        style={styles.deleteIcon}
                    />
                    <Text style={styles.modalTextTitle}>{title}</Text>
                    <Text style={styles.modalText}>
                        Are you sure you want to delete your whole account?
                        You'll lose everything. Your contacts and groups will be
                        gone forever.
                    </Text>
                    <Text style={styles.modalText}>
                        If you're sure, confirm by logging in below.
                    </Text>
                    <View style={styles.additionalContent}>
                        <View>
                            {modalContent}
                        </View>
                    </View>
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
                </View>
            </View>
        </Modal>
    );
};

export default SpecialModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    deleteIcon: {
        width: 100,
        height: 100,
        alignSelf: "center",
    },
    modalTextTitle: {
        fontFamily: "BROmnySemiBold",
        fontSize: 25,
        marginBottom: 10,
        textAlign: "center",
    },
    modalText: {
        fontFamily: "BROmnyRegular",
        width: 285,
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
        alignSelf: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
        marginBottom: 215,
        paddingHorizontal: 10,
    },
    buttonLeft: {
        fontFamily: "BROmnySemiBold",
        fontSize: 16,
        color: "#7D7D7D",
    },
    buttonRight: {
        fontFamily: "BROmnySemiBold",
        fontSize: 16,
        color: "#F74040",
    },
    additionalContent: {
        marginTop: 20,
    },
});
