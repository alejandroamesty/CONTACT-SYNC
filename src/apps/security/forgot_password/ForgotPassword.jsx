import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { API_URL, API_PORT } from "@env";

import ControlButton from "../../../components/buttons/ControlButton";
import BlueInput from "../../../components/inputs/BlueInput";
import SaveButton from "../../../components/buttons/SaveButton";
import MessageBar from "../../../components/MessageBar";

import ResetPassword from "./ResetPassword";
import VerifyCode from "./VerifyCode";

const Stack = createStackNavigator();

const ForgotPasswordScreen = ({ navigation }) => {
	const [showMessage, setShowMessage] = useState(false);
	const [severity, setSeverity] = useState("error");
	const [restart, setRestart] = useState(false);
	const [message, setMessage] = useState("");
	const [email, setEmail] = useState("");

	const handleForgotPassword = async () => {
		if (email === "") {
			console.log("Email is required");
			return;
		}

		try {
			const response = await fetch(`${API_URL}:${API_PORT}/forgotPassword`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (response.status === 200) {
				navigation.navigate("VerifyCode", { email });
			} else {
				setSeverity("error");
				setMessage("User not found");
				setShowMessage(true);
				setRestart(true);
				const errorText = await response.text();
				console.log("Error:", errorText);
			}
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return (
		<View style={styles.container}>
			<MessageBar severity={severity} caption={message} showTime={3000} restart={restart} setRestart={setRestart} />
			<ControlButton
				onPress={() => navigation.navigate("SignIn")}
				source={require("../../../../assets/images/arrow-go-back.png")}
				size={40}
				style={styles.arrow}
			/>
			<Text style={styles.title}>Trouble logging in?</Text>
			<Text style={styles.subtitle}>We've got you covered.</Text>
			<Text style={styles.message}>Enter your email and we'll send you a verification code to get back into your account</Text>
			<BlueInput placeholder="Enter your email" style={styles.emailInput} onChangeText={setEmail} value={email} />
			<SaveButton
				onPress={handleForgotPassword}
				title="Continue"
				style={[styles.continueButton, email === "" && styles.disabledButton]}
				disabled={email === ""}
			/>
			<TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.signUp}>
				<Text style={styles.normalText}>
					Want to create a new account? <Text style={styles.boldText}>Sign up</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const ForgotPassword = () => {
	return (
		<Stack.Navigator initialRouteName="ForgotPasswordScreen">
			<Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
			<Stack.Screen name="VerifyCode" component={VerifyCode} options={{ headerShown: false }} />
			<Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

export default ForgotPassword;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#030B38",
		alignItems: "center",
		justifyContent: "center",
	},
	arrow: {
		position: "absolute",
		height: 40,
		left: 25,
		top: 42,
		color: "#fff",
	},
	image: {
		width: 40,
		height: 40,
	},
	title: {
		position: "absolute",
		width: 246,
		height: 33,
		left: 30,
		top: 101,
		fontFamily: "BROmnySemiBold",
		fontSize: 30,
		lineHeight: 39,
		color: "#fff",
	},
	subtitle: {
		position: "absolute",
		width: 360,
		height: 33,
		left: 30,
		top: 149,
		fontFamily: "BROmnyRegular",
		fontSize: 30,
		lineHeight: 39,
		color: "#8C91B4",
	},
	undertitle: {
		position: "absolute",
		width: 290,
		height: 33,
		left: 30,
		top: 150,
		fontFamily: "BROmnyRegular",
		fontSize: 30,
		lineHeight: 39,
		color: "#8C91B4",
	},
	message: {
		position: "absolute",
		width: 350,
		left: 30,
		top: 222,
		fontFamily: "BROmnyRegular",
		fontSize: 17,
		color: "#fff",
	},
	captionInput: {
		position: "absolute",
		width: 163,
		height: 22,
		left: 32,
		top: 270,
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		lineHeight: 20,
		color: "#FFFFFF",
	},
	captionInput2: {
		position: "absolute",
		width: 163,
		height: 22,
		left: 32,
		top: 380,
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		lineHeight: 20,
		color: "#FFFFFF",
	},
	forgotPassword: {
		position: "absolute",
		right: 35,
		top: 499,
		fontFamily: "BROmnySemiBold",
		textAlign: "right",
		color: "#FFFFFF",
	},
	forgotPasswordText: {
		fontFamily: "BROmnySemiBold",
		fontSize: 15,
		lineHeight: 20,
		color: "#FFFFFF",
	},
	signUp: {
		position: "absolute",
		left: "calc(50% - 414px/2)",
		top: 692,
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		lineHeight: 20,
		textAlign: "center",
		color: "#FFFFFF",
	},
	normalText: {
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		lineHeight: 20,
		color: "#FFFFFF",
	},
	boldText: {
		fontFamily: "BROmnySemiBold",
		fontSize: 15,
		lineHeight: 20,
		color: "#8C91B4",
	},
	emailInput: {
		position: "absolute",
		top: 290,
	},
	passwordInput: {
		position: "absolute",
		top: 416,
	},
	continueButton: {
		position: "absolute",
		top: 390,
	},
	disabledButton: {
		backgroundColor: "#8C91B4",
	},
});
