import { View, Text, TouchableOpacity, StyleSheet, FlatList, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import ControlButton from "../../../components/buttons/ControlButton";
import { createStackNavigator } from "@react-navigation/stack";
import EditAccount from "./EditAccount";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import SpecialModal from "../../../components/modals/SpecialModal";
import GrayInput from "../../../components/inputs/GrayInput";
import CustomModal from "../../../components/modals/CustomModal";
import Carousel from "../../../components/Carousel";
import PhoneInput from "../../../components/inputs/PhoneInput";
import EmailInput from "../../../components/inputs/EmailInput";
import URLInput from "../../../components/inputs/URLInput";
import DateInput from "../../../components/inputs/DateInput";
import AddButton from "../../../components/buttons/AddButton";
import ContactDetail from "../contacts/ContactDetail";
import MessageBar from "../../../components/MessageBar";
import SignIn from "../../security/SignIn";

import { API_URL, API_PORT } from "@env";

const Stack = createStackNavigator();

const Profile = ({ navigation }) => {
	const [yourContact, setContact] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [deleteEmail, setDeleteEmail] = useState("");
	const [deletePassword, setDeletePassword] = useState("");
	const [showMessage, setShowMessage] = useState(false);
	const [severity, setSeverity] = useState("error");
	const [restart, setRestart] = useState(false);
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const id = 1;

	const [color, setColor] = useState(1);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [alias, setAlias] = useState("");
	const [company, setCompany] = useState("");
	const [address, setAddress] = useState("");

	const [phoneNumbers, setPhoneNumbers] = useState([]);
	const [emails, setEmails] = useState([]);
	const [urls, setURLs] = useState([]);
	const [dates, setDates] = useState([]);

	const colorMapping = {
		1: "#FFAC20",
		2: "#FF7246",
		3: "#FF4574",
		4: "#FF38EB",
		5: "#0684FE",
		6: "#33BE99",
	};

	const emailMapping = {
		1: "home",
		2: "work",
		3: "school",
		4: "office",
		5: "other",
	};

	const phoneMapping = {
		1: "home",
		2: "mobile",
		3: "work",
	};

	const urlMapping = {
		1: "website",
		2: "Instagram",
		3: "Twitter",
		4: "office",
		5: "other",
	};

	const dateMapping = {
		1: "birthday",
		2: "anniversary",
		3: "other",
	};

	useEffect(() => {
		const handleBackButton = () => true;
		BackHandler.addEventListener("hardwareBackPress", handleBackButton);
		return () => {
			BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
		};
	}, []);

	const goToEditAccount = () => {
		navigation.navigate("EditAccount");
	};

	const handleLogOut = () => {
		setModalVisible(true);
	};

	const onCancel = () => {
		setModalVisible(false);
	};

	const onNevermind = () => {
		setDeleteModalVisible(false);
	};

	const getContact = () => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/getContactById?id=1`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 200) {
					response.text().then((text) => {
						text = JSON.parse(text);
						const contact = text.contact;
						setContact(contact);
						console.log(contact);
						setFirstName(contact.first_name);
						setLastName(contact.last_name);
						setAlias(contact.contact_alias);
						setCompany(contact.company);
						setAddress(contact.address);
						setColor(contact.color);
						const formattedPhones = contact.phones.map((phone) => ({
							type: phoneMapping[phone.phone_type] || "home",
							phoneType: phone.phone_type || 1,
							phoneCode: phone.phone_code.toString() || "",
							phoneNumber: phone.phone_number || "",
						}));
						setPhoneNumbers(formattedPhones);
						const formattedEmails = contact.emails.map((email) => ({
							typeLabel: emailMapping[email.email_type] || "home",
							type: email.email_type || 1,
							email: email.email_direction || "",
						}));
						setEmails(formattedEmails);
						const formattedDates = contact.dates.map((date) => ({
							typeLabel: dateMapping[date.date_type] || "birthday",
							type: date.date_type || 1,
							date: date.contact_date || new Date(),
						}));
						setDates(formattedDates);
						const formattedUrls = contact.urls.map((url) => ({
							typeLabel: urlMapping[url.url_type] || "website",
							type: url.url_type || 1,
							url: url.url || "",
						}));
						setURLs(formattedUrls);
					});
				} else {
					console.log("Error");
					console.log(response.status);
					response.text().then((text) => {
						console.log(text);
					});
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	};

	useEffect(() => {
		getContact();
	}, []);

	const onAccept = () => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/logout`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 200) {
					navigation.navigate("StartScreen");
				} else {
					console.log("Error");
					console.log(response.status);
					response.text().then((text) => {
						console.log(text);
					});
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	};

	const handleDeleteAccount = () => {
		setDeleteModalVisible(true);
	};

	const onDelete = () => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/deleteUser`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: deleteEmail,
				password: deletePassword,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					console.log("Success on delete");
					navigation.navigate("StartScreen");
				} else {
					setSeverity("error");
					setMessage("Invalid email or password");
					setShowMessage(true);
					setRestart(true);
					response.text().then((text) => {
						console.log(text);
					});
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	};

	const updateContact = () => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/updateContact`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contactId: id,
				firstName: firstName,
				lastName: lastName,
				alias: alias,
				company: company,
				address: address,
				phones: phoneNumbers,
				emails: emails,
				urls: urls,
				dates: dates,
				color: color,
			}),
		}).then((response) => {
			if (response.status === 200) {
				getContact();
				response.text().then((text) => {
					closeModal();
				});
			} else {
				console.log("Error:", response.status);
				response.text().then((text) => {
					text = JSON.parse(text);
					setErrorMessage(text.message);
					console.log(text);
				});
			}
		});
	};

	const openModal = () => {
		setEditModalVisible(true);
	};

	const closeModal = () => {
		setEditModalVisible(false);
		setErrorMessage("");
	};

	const addPhoneNumber = () => {
		setPhoneNumbers([...phoneNumbers, { type: "home", phoneType: 1, phoneCode: "", phoneNumber: "" }]);
	};

	const setPhone = (index, newPhone) => {
		const updatedPhones = phoneNumbers.map((phone, i) => (i === index ? newPhone : phone));
		setPhoneNumbers(updatedPhones);
	};

	const removePhone = (index) => {
		const updatedPhones = phoneNumbers.filter((_, i) => i !== index);
		setPhoneNumbers(updatedPhones);
	};

	const addEmail = () => {
		setEmails([...emails, { typeLabel: "home", type: 1, email: "" }]);
	};

	const setEmail = (index, newEmail) => {
		const updatedEmails = emails.map((email, i) => (i === index ? newEmail : email));
		setEmails(updatedEmails);
	};

	const removeEmail = (index) => {
		const updatedEmails = emails.filter((_, i) => i !== index);
		setEmails(updatedEmails);
	};

	const addURL = () => {
		setURLs([...urls, { typeLabel: "website", type: 1, url: "" }]);
	};

	const setURL = (index, newURL) => {
		const updatedURLs = urls.map((url, i) => (i === index ? newURL : url));
		setURLs(updatedURLs);
	};

	const removeURL = (index) => {
		const updatedURLs = urls.filter((_, i) => i !== index);
		setURLs(updatedURLs);
	};

	const addDate = () => {
		setDates([...dates, { typeLabel: "birthday", type: 1, date: new Date() }]);
	};

	const setDate = (index, newDate) => {
		const updatedDates = dates.map((date, i) => (i === index ? newDate : date));
		setDates(updatedDates);
	};

	const removeDate = (index) => {
		const updatedDates = dates.filter((_, i) => i !== index);
		setDates(updatedDates);
	};

	return (
		<Stack.Navigator>
			<Stack.Screen name="ProfileScreen" options={{ headerShown: false }}>
				{() => (
					<>
						<View style={styles.container}>
							<Text style={styles.title}>Profile</Text>

							<View style={styles.buttons}>
								<TouchableOpacity onPress={() => navigation.navigate("MyContactDetail", { contact: yourContact })}>
									<View style={styles.card}>
										<ControlButton
											source={require("../../../../assets/images/Profile/Edit.png")}
											size={30}
											style={styles.edit}
											onPress={openModal}
										/>
										<View>
											<View style={{ ...styles.userIcon, backgroundColor: colorMapping[color] }}>
												<Text style={styles.firstNameInitial}>
													{alias ? alias[0].toUpperCase() : firstName ? firstName[0].toUpperCase() : "?"}
												</Text>
											</View>
											<Text style={styles.name}>
												{alias === "" ? (firstName === "" ? "User" : `${firstName} ${lastName}`) : alias}
											</Text>
											<Text style={styles.cardText}>My Card</Text>
										</View>
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={goToEditAccount}>
									<View style={styles.button}>
										<ControlButton
											source={require("../../../../assets/images/Profile/Profile.png")}
											size={30}
											style={styles.add}
											onPress={goToEditAccount}
										/>
										<Text style={styles.text}>Edit account</Text>
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={handleDeleteAccount}>
									<View style={styles.button}>
										<ControlButton
											source={require("../../../../assets/images/Profile/Delete.png")}
											size={30}
											style={styles.add}
											onPress={handleDeleteAccount}
										/>
										<Text style={styles.text}>Delete my account</Text>
									</View>
								</TouchableOpacity>

								<SpecialModal
									visible={deleteModalVisible}
									closeModal={onCancel}
									title="Now just a minute."
									cancelButtonName="NEVERMIND"
									doneButtonName="DELETE EVERYTHING"
									cancelButtonAction={onNevermind}
									doneButtonAction={onDelete}
									cancelButtonColor="#7D7D7D"
									doneButtonColor="#F74040"
									modalContent={
										<View style={styles.inputDelete}>
											<GrayInput placeholder="Email" style={styles.input} onChangeText={setDeleteEmail} />
											<GrayInput placeholder="Password" style={styles.lastInput} onChangeText={setDeletePassword} />
										</View>
									}
								/>

								<TouchableOpacity onPress={handleLogOut}>
									<View style={styles.button}>
										<ControlButton source={require("../../../../assets/images/Profile/Leave.png")} size={30} style={styles.add} onPress={handleLogOut} />
										<Text style={styles.text}>Log out</Text>
									</View>
								</TouchableOpacity>
							</View>

							<CustomModal
								visible={editModalVisible}
								closeModal={closeModal}
								title="Edit contact"
								cancelButtonName="Cancel"
								doneButtonName="Done"
								cancelButtonAction={closeModal}
								doneButtonAction={updateContact}
								cancelButtonColor="#F50"
								doneButtonColor="#33BE99"
								modalContent={
									<View style={styles.modalContentContainer}>
										<View style={styles.carouselContainer}>
											<Carousel
												letter={firstName ? firstName[0].toUpperCase() : "?"}
												defaultColor={colorMapping[color]}
												setIndex={setColor}
											/>
										</View>
										<FlatList
											style={styles.list}
											ListHeaderComponent={
												<>
													<GrayInput
														placeholder="First name"
														style={styles.input}
														value={firstName}
														onChangeText={setFirstName}
														defaultValue={firstName}
														characterLimit={40}
													/>
													<GrayInput
														placeholder="Last name"
														style={styles.input}
														value={lastName}
														onChangeText={setLastName}
														defaultValue={lastName}
														characterLimit={40}
													/>
													<GrayInput
														placeholder="Alias"
														style={styles.input}
														value={alias}
														onChangeText={setAlias}
														defaultValue={alias}
														characterLimit={15}
													/>
													<GrayInput
														placeholder="Company"
														style={styles.input}
														value={company}
														onChangeText={setCompany}
														defaultValue={company}
														characterLimit={20}
													/>
													<GrayInput
														placeholder="Address"
														style={{ marginBottom: 0 }}
														value={address}
														onChangeText={setAddress}
														defaultValue={address}
														characterLimit={100}
													/>
												</>
											}
											ListFooterComponent={
												<>
													<Text style={styles.sectionTitle}>Phone Numbers</Text>
													{phoneNumbers.map((phone, index) => (
														<PhoneInput
															key={index}
															phone={phone}
															setPhone={(newPhone) => setPhone(index, newPhone)}
															removePhone={() => removePhone(index)}
														/>
													))}
													<AddButton onPress={addPhoneNumber} buttonText="add phone number" />
													<Text style={styles.errorMessage}>{errorMessage}</Text>
													<Text style={styles.sectionTitle}>Emails</Text>
													{emails.map((email, index) => (
														<EmailInput
															key={index}
															data={email}
															setData={(newEmail) => setEmail(index, newEmail)}
															removeData={() => removeEmail(index)}
														/>
													))}
													<AddButton onPress={addEmail} buttonText="add email" />
													<Text style={styles.sectionTitle}>URLs</Text>
													{urls.map((url, index) => (
														<URLInput
															key={index}
															data={url}
															setData={(newURL) => setURL(index, newURL)}
															removeData={() => removeURL(index)}
														/>
													))}
													<AddButton onPress={addURL} buttonText="add URL" />
													<Text style={styles.sectionTitle}>Dates</Text>
													{dates.map((date, index) => (
														<DateInput
															key={index}
															data={date}
															setData={(newDate) => setDate(index, newDate)}
															removeData={() => removeDate(index)}
														/>
													))}
													<AddButton onPress={addDate} buttonText="add date" />
												</>
											}
										/>
									</View>
								}
							/>
							<ConfirmationModal
								visible={modalVisible}
								image={require("../../../../assets/images/Logout.png")}
								title="See you soon!"
								text="You are about to logout. Are you sure this is what you want?"
								cancelButtonText="CANCEL"
								acceptButtonText="ACCEPT"
								onCancel={onCancel}
								onAccept={onAccept}
							/>
						</View>
						<MessageBar severity={severity} message={message} restart={restart} setRestart={setRestart} showTime={3000} />
					</>
				)}
			</Stack.Screen>
			<Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
			<Stack.Screen name="EditAccount" component={EditAccount} options={{ headerShown: false }} />
			<Stack.Screen name="MyContactDetail" component={ContactDetail} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#030B38",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContentContainer: {
		alignItems: "center",
	},
	carouselContainer: {
		marginLeft: -20,
		marginRight: -20,
	},
	title: {
		position: "absolute",
		left: 23,
		top: 49,
		fontFamily: "BROmnySemiBold",
		fontSize: 25,
		color: "#fff",
	},
	add: {
		position: "absolute",
		left: 20,
	},
	edit: {
		position: "absolute",
		right: 20,
		bottom: 38,
	},
	text: {
		color: "white",
		fontSize: 20,
		fontFamily: "BROmnyMedium",
		marginBottom: 2,
	},
	name: {
		color: "white",
		fontSize: 20,
		fontFamily: "BROmnyMedium",
		marginBottom: 2,
		paddingLeft: 22,
	},
	cardText: {
		color: "white",
		fontSize: 16,
		fontFamily: "BROmnyRegular",
		marginBottom: 2,
		paddingLeft: 22,
	},
	list: {
		marginTop: 20,
		height: 366,
	},
	card: {
		width: 366,
		height: 86,
		backgroundColor: "#1E264D",
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 71,
		marginBottom: 16,
	},
	button: {
		width: 366,
		height: 60,
		backgroundColor: "#1E264D",
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 67,
		marginBottom: 16,
	},
	buttons: {
		position: "absolute",
		top: 110,
	},
	userIcon: {
		position: "absolute",
		left: -48,
		width: 48,
		height: 48,
		borderRadius: 24,
		justifyContent: "center",
	},
	firstNameInitial: {
		position: "absolute",
		fontFamily: "BROmnyMedium",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 24,
		alignSelf: "center",
		color: "#FFFFFF",
	},
	input: {
		marginBottom: 12,
	},
	lastInput: {
		marginBottom: 12,
	},
	inputDelete: {
		alignSelf: "center",
	},
	sectionTitle: {
		fontSize: 18,
		fontFamily: "BROmnyMedium",
		color: "#000",
		marginTop: 20,
		marginBottom: 10,
	},
	errorMessage: {
		color: "#F50000",
		fontSize: 16,
		fontFamily: "BROmnyRegular",
		marginTop: 10,
	},
});
