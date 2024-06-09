import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { API_URL, API_PORT } from "@env";
import BlueInput from "../../components/inputs/BlueInput";
import SaveButton from "../../components/buttons/SaveButton";
import ControlButton from "../../components/buttons/ControlButton";
import MessageBar from "../../components/MessageBar";

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignInDisabled, setIsSignInDisabled] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [severity, setSeverity] = useState("error");
	const [restart, setRestart] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		setIsSignInDisabled(email === "" || password === "");
	}, [email, password]);

	async function handleSignIn() {
		console.log("Signing in");
		console.log(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/login`);
		if (email === "" || password === "") {
			console.log("Empty fields");
			return;
		}
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => {
				switch (response.status) {
					case 200:
						navigation.navigate("MainTab");
						setRestart(true);
						break;
					case 401:
						setSeverity("error");
						setMessage("Invalid password");
						setShowMessage(true);
						console.log("Invalid email or password");
						setRestart(true);
						break;
					case 404:
						setSeverity("error");
						setMessage("User not found");
						setShowMessage(true);
						setRestart(true);
						break;
					case 500:
						setSeverity("error");
						setMessage("Server error");
						setShowMessage(true);
						setRestart(true);
						break;
					default:
						setSeverity("error");
						setMessage("Unknown Error");
						setShowMessage(true);
						setRestart(true);
						break;
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	}

	return (
		<View style={styles.container}>
			{showMessage && <MessageBar severity={severity} caption={message} showTime={3000} setRestart={setRestart} restart={restart} />}
			<ControlButton
				onPress={() => navigation.navigate("StartScreen")}
				source={require("../../../assets/images/arrow-go-back.png")}
				size={40}
				style={styles.arrow}
			/>
			<Text style={styles.title}>Let's sign you in</Text>
			<Text style={styles.subtitle}>Welcome back.</Text>
			<Text style={styles.undertitle}>You've been missed!</Text>

			<Text style={styles.captionInput}>Email</Text>
			<BlueInput placeholder="Enter your email" style={styles.emailInput} onChangeText={setEmail} value={email} />
			<Text style={styles.captionInput2}>Password</Text>
			<BlueInput placeholder="Enter your password" style={styles.passwordInput} onChangeText={setPassword} value={password} isPassword={true} />

			<TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgotPassword}>
				<Text style={styles.forgotPasswordText}>Forgot password?</Text>
			</TouchableOpacity>

			<SaveButton onPress={handleSignIn} title="Sign in" style={styles.saveButton} disabled={isSignInDisabled} />

			<TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.signUp}>
				<Text style={styles.normalText}>
					Don't have an account? <Text style={styles.boldText}>Sign up</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignIn;

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
	title: {
		position: "absolute",
		width: 246,
		height: 50,
		left: 30,
		top: 101,
		fontFamily: "BROmnySemiBold",
		fontSize: 30,
		lineHeight: 39,
		color: "#fff",
	},
	subtitle: {
		position: "absolute",
		width: 246,
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
		top: 188,
		fontFamily: "BROmnyRegular",
		fontSize: 30,
		lineHeight: 39,
		color: "#8C91B4",
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
		top: 306,
	},
	passwordInput: {
		position: "absolute",
		top: 416,
	},
	saveButton: {
		position: "absolute",
		top: 548,
	},
});
