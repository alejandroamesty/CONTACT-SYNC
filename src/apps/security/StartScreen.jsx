import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { API_URL, API_PORT } from "@env";

const StartScreen = ({ navigation }) => {
	useEffect(() => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/checkSession`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 200) {
					navigation.navigate("MainTab");
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	}, []);
	return (
		<View style={styles.container}>
			<Text style={styles.normalText}>
				contact<Text style={styles.boldText}>sync</Text>
			</Text>
			<View style={styles.bgButtons}>
				<TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.bgSignIn}>
					<Text style={styles.signInText}>Sign in</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.bgSignUp}>
					<Text style={styles.signUpText}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default StartScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#030B38",
		alignItems: "center",
		justifyContent: "center",
	},
	normalText: {
		position: "absolute",
		fontFamily: "BROmnyRegular",
		fontSize: 32,
		color: "#fff",
	},
	boldText: {
		fontFamily: "BROmnySemiBold",
		fontSize: 32,
		color: "#fff",
	},
	signInText: {
		fontFamily: "BROmnySemiBold",
		fontSize: 18,
		lineHeight: 24,
		color: "#FFFFFF",
		zIndex: 2,
	},
	signUpText: {
		fontFamily: "BROmnySemiBold",
		fontSize: 18,
		lineHeight: 24,
		color: "#FFFFFF",
		zIndex: 2,
	},
	bgSignIn: {
		width: 185,
		height: 58,
		backgroundColor: "#121B4A",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	bgSignUp: {
		width: 185,
		height: 58,
		backgroundColor: "#1E264D",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	bgButtons: {
		flexDirection: "row",
		width: 370,
		height: 58,
		top: 318,
		borderRadius: 20,
		backgroundColor: "#1E264D",
		alignItems: "center",
	},
});
