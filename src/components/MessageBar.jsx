import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const severityStyles = {
	success: {
		backgroundColor: "#28a745",
		icon: "check-circle",
		placeholder: "Success",
	},
	error: { backgroundColor: "#E84C3D", icon: "error", placeholder: "Error" },
	info: { backgroundColor: "#17a2b8", icon: "info", placeholder: "Info" },
	warning: {
		backgroundColor: "#ffc107",
		icon: "warning",
		placeholder: "Warning",
	},
};

const MessageBar = ({ severity, caption, showTime, restart, setRestart }) => {
	const { backgroundColor, icon, placeholder } = severityStyles[severity];
	const slideAnim = useRef(new Animated.Value(-100)).current;

	const startTimer = () => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();

		setTimeout(() => {
			Animated.timing(slideAnim, {
				toValue: -100,
				duration: 500,
				useNativeDriver: true,
			}).start();
		}, showTime);
	};

	useEffect(() => {
		if (restart) {
			setRestart(false);
			startTimer();
		}
	}, [restart]);

	return (
		<Animated.View style={[styles.container, { backgroundColor, transform: [{ translateY: slideAnim }] }]}>
			<Icon name={icon} size={27} color="#FFFFFF" style={styles.icon} />
			<View style={styles.textContainer}>
				<Text style={styles.placeholderText}>{placeholder}:</Text>
				<Text style={styles.captionText}>{` ${caption}`}</Text>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: 300,
		height: 63,
		alignSelf: "center",
		top: 20.01,
		backdropFilter: "blur(2px)",
		borderRadius: 100,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		zIndex: 9999,
	},
	icon: {
		position: "absolute",
		left: 20,
		top: 18,
	},
	textContainer: {
		flexDirection: "row",
		position: "absolute",
		left: 62,
		top: 18,
		alignItems: "center",
	},
	placeholderText: {
		fontFamily: "BROmnySemiBold",
		fontSize: 18,
		color: "#FFFFFF",
	},
	captionText: {
		fontFamily: "BROmnyRegular",
		fontSize: 18,
		color: "#FFFFFF",
	},
});

export default MessageBar;
