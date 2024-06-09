import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import BlueInput from "../../../components/inputs/BlueInput";
import SaveButton from "../../../components/buttons/SaveButton";
import NewTextButton from "../../../components/buttons/NewTextButton";
import MessageBar from "../../../components/MessageBar";
import { API_URL, API_PORT } from "@env";

const EditAccount = ({ navigation: { goBack } }) => {
	const [email, setEmail] = React.useState("");
	const [currentPassword, setCurrentPassword] = React.useState("");
	const [newPassword, setNewPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [showMessage, setShowMessage] = useState(false);
	const [severity, setSeverity] = useState("error");
	const [restart, setRestart] = useState(false);
	const [message, setMessage] = useState("");
	const handleSaveChanges = () => {
		if (email === "" && (currentPassword === "" || newPassword === "" || confirmPassword === "")) {
			alert("Please fill all fields");
			return;
		}

		// check email and update email
		if (email !== "") {
			let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			if (!emailRegex.test(email)) {
				setSeverity("error");
				setMessage("Invalid email address");
				setShowMessage(true);
				setRestart(true);
				return;
			}
			fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/updateUserEmail`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					newEmail: email,
				}),
			}).then((response) => {
				switch (response.status) {
					case 200:
						alert("Email updated successfully");
						if (newPassword === "" && confirmPassword === "") navigation.goBack();
						break;
					case 400:
						setSeverity("error");
						setMessage("Missing fields");
						setShowMessage(true);
						setRestart(true);
						break;
					case 401:
						setSeverity("error");
						setMessage("No session found");
						setShowMessage(true);
						setRestart(true);
						navigation.navigate("SignIn");
						break;
					case 402:
						setSeverity("error");
						setMessage("Invalid email");
						setShowMessage(true);
						setRestart(true);
						break;
					case 403:
						setSeverity("error");
						setMessage("Email already exists");
						setShowMessage(true);
						setRestart(true);
						break;
					default:
						setSeverity("error");
						setMessage("An error occured");
						setShowMessage(true);
						setRestart(true);
						break;
				}
			});
		}

		// check password and update password
		if (newPassword !== "") {
			if (newPassword !== confirmPassword) {
				setSeverity("error");
				setMessage("Passwords do not match");
				setShowMessage(true);
				setRestart(true);
				return;
			}
			if (newPassword.length < 8) {
				alert("Password must be at least 8 characters long");
				return;
			}
			fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/updateUserPassword`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					oldPassword: currentPassword,
					newPassword: newPassword,
				}),
			}).then((response) => {
				switch (response.status) {
					case 200:
						navigation.goBack();
						break;
					case 400:
						setSeverity("error");
						setMessage("Missing fields");
						setShowMessage(true);
						setRestart(true);
						break;
					case 401:
						setSeverity("error");
						setMessage("No session found");
						setShowMessage(true);
						setRestart(true);
						navigation.navigate("SignIn");
						break;
					case 402:
						setSeverity("error");
						setMessage("Invalid password");
						setShowMessage(true);
						setRestart(true);
						break;
					case 403:
						setSeverity("error");
						setMessage("Invalid new password");
						setShowMessage(true);
						setRestart(true);
						break;
					default:
						setSeverity("error");
						setMessage("An error occured");
						setShowMessage(true);
						setRestart(true);
						break;
				}
			});
		}
	};

	return (
		<View style={styles.container}>
			<MessageBar severity={severity} caption={message} showTime={3000} restart={restart} setRestart={setRestart} />
			<View style={styles.goBackButton}>
				<NewTextButton onPress={() => goBack()} buttonText={"< Back"} />
			</View>
			<Text style={styles.title}>Edit account</Text>

			<Text style={styles.captionSection}>Email</Text>
			<BlueInput placeholder="Enter your email" style={styles.emailInput} width={366} onChangeText={setEmail} />

			<Text style={styles.captionSection2}>Password</Text>

			<Text style={styles.captionInput1}>Current password</Text>
			<BlueInput placeholder="********" style={styles.currentInput} width={366} onChangeText={setCurrentPassword} />

			<Text style={styles.captionInput2}>New password</Text>
			<BlueInput placeholder="Enter your password" style={styles.passwordInput} width={366} onChangeText={setNewPassword} />

			<Text style={styles.captionInput3}>Confirm password</Text>
			<BlueInput placeholder="Confirm your password" style={styles.confirmInput} width={366} onChangeText={setConfirmPassword} />

			<SaveButton title="Save changes" style={styles.saveButton} onPress={() => handleSaveChanges()} width={366} />
		</View>
	);
};

export default EditAccount;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#030B38",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		position: "absolute",
		left: 23,
		top: 49,
		fontFamily: "BROmnySemiBold",
		fontSize: 25,
		color: "#fff",
	},
	captionSection: {
		position: "absolute",
		left: 23,
		top: 100,
		fontFamily: "BROmnyMedium",
		fontSize: 18,
		color: "#fff",
	},
	emailInput: {
		position: "absolute",
		alignSelf: "center",
		top: 142,
	},
	captionSection2: {
		position: "absolute",
		left: 23,
		top: 213,
		fontFamily: "BROmnyMedium",
		fontSize: 18,
		color: "#fff",
	},
	captionInput1: {
		position: "absolute",
		left: 23,
		top: 255,
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		color: "#fff",
	},
	currentInput: {
		position: "absolute",
		alignSelf: "center",
		top: 285,
	},
	captionInput2: {
		position: "absolute",
		left: 23,
		top: 357,
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		color: "#fff",
	},
	passwordInput: {
		position: "absolute",
		alignSelf: "center",
		top: 393,
	},
	captionInput3: {
		position: "absolute",
		left: 23,
		top: 465,
		fontFamily: "BROmnyRegular",
		fontSize: 15,
		color: "#fff",
	},
	confirmInput: {
		position: "absolute",
		alighnSelf: "center",
		top: 501,
	},
	saveButton: {
		position: "absolute",
		alignSelf: "center",
		top: 580,
	},
	goBackButton: {
		position: "absolute",
		left: 10,
		top: -5,
	},
});
