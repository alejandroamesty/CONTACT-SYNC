import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BlueInput from "../../components/inputs/BlueInput";
import SaveButton from "../../components/buttons/SaveButton";
import ControlButton from "../../components/buttons/ControlButton";
import { API_URL, API_PORT } from "@env";

const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		setDoPasswordsMatch(password === confirmPassword);
		setErrorMessage(password !== "" && confirmPassword !== "" && password !== confirmPassword ? "Passwords do not match" : "");
	}, [password, confirmPassword]);

	useEffect(() => {
		setIsEmailValid(validateEmail(email));
	}, [email]);

	useEffect(() => {
		setIsPasswordValid(validatePasswordLength(password));
	}, [password]);

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePasswordLength = (password) => {
		const minLength = 8;
		const maxLength = 20;
		return password.length >= minLength && password.length <= maxLength;
	};

	function handleSignUp() {
		if (!isEmailValid || !isPasswordValid || !doPasswordsMatch) {
			console.log("Invalid form data");
			return;
		}

		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/register`, {
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
						console.log("Success");
						navigation.navigate("SignIn");
						break;
					case 400:
						console.log("Missing Fields");
						break;
					case 409:
						console.log("User already exists");
						break;
					case 500:
						console.log("Internal server error");
						break;
					default:
						console.log("Unknown error");
						console.log(response.status);
						response.text().then((text) => {
							console.log(text);
						});
						break;
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	}

	return (
		<View style={styles.container}>
			<ControlButton
				onPress={() => navigation.navigate("StartScreen")}
				source={require("../../../assets/images/arrow-go-back.png")}
				size={40}
				style={styles.arrow}
			/>
			<Text style={styles.title}>Create your account</Text>
			<Text style={styles.subtitle}>Welcome aboard.</Text>
			<Text style={styles.undertitle}>Ready to begin?</Text>

			<Text style={styles.captionInput}>Email</Text>
			<BlueInput placeholder="Enter your email" style={styles.emailInput} onChangeText={(text) => setEmail(text)} type="email" />
			<Text style={styles.captionInput2}>Password</Text>
			<BlueInput placeholder="Enter your password" style={styles.passwordInput} onChangeText={(text) => setPassword(text)} type="password" />
			<Text style={styles.captionInput3}>Confirm password</Text>
			<BlueInput
				placeholder="Confirm your password"
				style={styles.confirmInput}
				onChangeText={(text) => setConfirmPassword(text)}
				type="password"
			/>

			{/* Mostrar el mensaje de error si las contraseñas no coinciden */}
			{errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

			<SaveButton
				title="Sign up"
				style={styles.saveButton}
				onPress={handleSignUp}
				disabled={!isEmailValid || !isPasswordValid || !doPasswordsMatch}
			/>

			<TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.signUp}>
				<Text style={styles.normalText}>
					Already have an account? <Text style={styles.boldText}>Sign in</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignUp;

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
		width: 350,
		height: 40,
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
		height: 40,
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
		height: 40,
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
		top: 261,
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
		top: 371,
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		lineHeight: 20,
		color: "#FFFFFF",
	},
	captionInput3: {
		position: "absolute",
		width: 163,
		height: 22,
		left: 32,
		top: 481,
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		lineHeight: 20,
		color: "#FFFFFF",
	},
	errorMessage: {
		position: "absolute",
		top: 371,
		right: 32,
		color: "#F4385A",
		fontFamily: "BROmnyRegular",
		fontSize: 12,
		lineHeight: 20,
	},
	forgotPassword: {
		position: "absolute",
		width: 163,
		height: 22,
		left: 216,
		top: 499,
		fontFamily: "BROmnySemiBold",
		fontSize: 15,
		lineHeight: 20,
		textAlign: "right",
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
		top: 297,
	},
	passwordInput: {
		position: "absolute",
		top: 407,
	},
	confirmInput: {
		position: "absolute",
		top: 517,
	},
	saveButton: {
		position: "absolute",
		top: 612,
	},
});
