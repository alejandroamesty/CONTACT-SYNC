import React from "react";
import {
    View,
    Text,
    Modal,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";

const ConfirmationModal = ({
    visible,
    image,
    title,
    text,
    cancelButtonText,
    acceptButtonText,
    onCancel,
    onAccept,
}) => {
    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <BlurView style={styles.overlay} intensity={100} tint="dark">
                <View style={styles.modalContainer}>
                    {image && <Image source={image} style={styles.image} />}
                    {title && <Text style={styles.title}>{title}</Text>}
                    {text && <Text style={styles.text}>{text}</Text>}
                    <View style={styles.buttonContainer}>
                        {cancelButtonText && (
                            <TouchableOpacity
                                onPress={onCancel}
                                style={styles.button}
                            >
                                <Text style={styles.cancelButtonText}>
                                    {cancelButtonText}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {acceptButtonText && (
                            <TouchableOpacity
                                onPress={onAccept}
                                style={styles.button}
                            >
                                <Text style={styles.acceptButtonText}>
                                    {acceptButtonText}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {!cancelButtonText && acceptButtonText && (
                            <TouchableOpacity
                                onPress={onAccept}
                                style={styles.singleButton}
                            >
                                <Text style={styles.acceptButtonText}>
                                    {acceptButtonText}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: 326,
        height: 319,
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 20,
    },
    image: {
        width: 78,
        height: 78,
    },
    title: {
        width: 277,
        fontFamily: "BR Omny",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 25,
        lineHeight: 33,
        textAlign: "center",
        color: "#000000",
    },
    text: {
        width: 281,
        fontFamily: "BR Omny",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 21,
        lineHeight: 28,
        textAlign: "center",
        color: "#000000",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    button: {
        paddingHorizontal: 20,
    },
    cancelButtonText: {
        fontFamily: "BR Omny",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21,
        color: "#F50000",
    },
    acceptButtonText: {
        fontFamily: "BR Omny",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21,
        color: "#33BE99",
    },
    singleButton: {
        alignSelf: "center",
    },
});
