import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ControlButton from "../../../components/buttons/ControlButton";
import ContactList from "../../../components/lists/ContactList";
import { createStackNavigator } from "@react-navigation/stack";
import ContactDetail from "./ContactDetail";
import { API_URL, API_PORT } from "@env";

import BlueInput from "../../../components/inputs/BlueInput";
import GrayInput from "../../../components/inputs/GrayInput";
import Carousel from "../../../components/Carousel";
import CustomModal from "../../../components/modals/CustomModal";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
	const [contacts, setContacts] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [firstName, setFirstName] = useState("");

	useEffect(() => {
		fetch(`${API_URL}:${API_PORT}/getContacts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 200) {
					response
						.text()
						.then((fetchedContacts) => {
							fetchedContacts = JSON.parse(fetchedContacts);
							const newContacts = [];
							fetchedContacts.contacts.forEach((contact) => {
								if (contact.id !== 1) {
									newContacts.push(contact);
								}
							});
							setContacts(newContacts);
						})
						.catch((error) => {
							console.log("Error:", error);
						});
				} else if (response.status === 401) {
					console.log("No session found");
					navigation.navigate("SignIn");
				} else {
					console.log(response.status);
					response.text().then((text) => {
						console.log(text);
					});
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	}, []);

	const filteredContacts = useMemo(
		() => contacts.filter((contact) => contact.first_name.toLowerCase().includes(searchText.toLowerCase())),
		[contacts, searchText]
	);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Hello</Text>
			<Text style={styles.subtitle}>Alejandro Ávila</Text>

			<Text style={styles.undertitle}>Contacts</Text>

			<ControlButton source={require("../../../../assets/images/Add.png")} size={36} style={styles.add} onPress={openModal} />

			<BlueInput
				style={styles.searchInput}
				placeholder="Search"
				width={366}
				height={60}
				fontSize={18}
				image={require("../../../../assets/images/Search.png")}
				value={searchText}
				onChangeText={setSearchText}
				backgroundColor="#030B38"
			/>

			<View style={styles.contactsContainer}>
				<ContactList contacts={filteredContacts} addToGroup={() => {}} deleteContact={() => {}} navigation={navigation} />
			</View>

			<CustomModal
				visible={modalVisible}
				closeModal={closeModal}
				title="New contact"
				cancelButtonName="Cancel"
				doneButtonName="Done"
				cancelButtonAction={closeModal}
				doneButtonAction={closeModal}
				cancelButtonColor="#F50"
				doneButtonColor="#33BE99"
				modalContent={
					<View>
						<View style={styles.carouselContainer}>
							<Carousel letter={firstName ? firstName[0].toUpperCase() : "?"} />
						</View>
						<View style={styles.inputContact}>
							<GrayInput placeholder="First name" style={styles.input} value={firstName} onChangeText={setFirstName} />
							<GrayInput placeholder="Last name" style={styles.input} />
							<GrayInput placeholder="Alias" style={styles.input} />
							<GrayInput placeholder="Company" style={styles.input} />
							<GrayInput placeholder="Address" style={[styles.input, styles.lastInput]} />
						</View>
					</View>
				}
			/>
		</View>
	);
};

const Home = () => {
	return (
		<Stack.Navigator initialRouteName="HomeScreen">
			<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="ContactDetail" component={ContactDetail} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#030B38",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		position: "absolute",
		width: 51,
		height: 27,
		left: 23,
		top: 49,
		fontFamily: "BROmnyRegular",
		fontSize: 18,
		color: "#fff",
	},
	subtitle: {
		position: "absolute",
		width: 184,
		height: 33,
		left: 23,
		top: 70,
		fontFamily: "BROmnySemiBold",
		fontSize: 25,
		color: "#fff",
	},
	undertitle: {
		position: "absolute",
		width: 184,
		height: 33,
		left: 23,
		top: 217,
		fontFamily: "BROmnySemiBold",
		fontSize: 25,
		color: "#fff",
	},
	searchInput: {
		position: "absolute",
		top: 129,
	},
	add: {
		position: "absolute",
		left: 351,
		top: 214,
	},
	contactsContainer: {
		position: "absolute",
		top: 260,
		left: 23,
		right: 23,
		bottom: 2,
		overflow: "hidden",
	},
	carouselContainer: {
		marginLeft: -20,
		marginRight: -20,
	},
	inputContact: {
		marginTop: 20,
		alignSelf: "center",
	},
	input: {
		marginBottom: 12,
	},
	lastInput: {
		marginBottom: 0,
	},
	userIcon: {
		position: "absolute",
		right: 25,
		top: 214,
		width: 48,
		height: 48,
		top: 55,
		borderRadius: 24,
		backgroundColor: "#0684FE",
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
});
