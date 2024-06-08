import React, { useState, useMemo, useEffect, useRef } from "react";
import { StyleSheet, View, Text, FlatList, Animated } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { API_URL, API_PORT } from "@env";

import ContactDetail from "./ContactDetail";

import ControlButton from "../../../components/buttons/ControlButton";
import ContactList from "../../../components/lists/ContactList";
import AddButton from "../../../components/buttons/AddButton";
import PhoneInput from "../../../components/inputs/PhoneInput";
import EmailInput from "../../../components/inputs/EmailInput";
import URLInput from "../../../components/inputs/URLInput";
import BlueInput from "../../../components/inputs/BlueInput";
import GrayInput from "../../../components/inputs/GrayInput";
import Carousel from "../../../components/Carousel";
import CustomModal from "../../../components/modals/CustomModal";
import DateInput from "../../../components/inputs/DateInput";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import List from "../../../components/lists/List";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
	const [yourName, setYourName] = useState("");
	const [yourLastName, setYourLastName] = useState("");
	const [yourAlias, setYourAlias] = useState("");
	const [yourColor, setYourColor] = useState(1);
	const [contacts, setContacts] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [color, setColor] = useState(1);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [alias, setAlias] = useState("");
	const [company, setCompany] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumbers, setPhoneNumbers] = useState([{ type: "home", phoneType: 1, phoneCode: "", phoneNumber: "" }]);
	const [emails, setEmails] = useState([]);
	const [urls, setURLs] = useState([]);
	const [dates, setDates] = useState([]);
	const [deleteModal, setDeleteModal] = useState(false);
	const [groupModal, setGroupModal] = useState(false);
	const [resetItem, setResetItem] = useState(null);
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const [contactsAndGroups, setContactsAndGroups] = useState([]);
	const [selectedContactId, setSelectedContactId] = useState([]);
	const [allGroups, setAllGroups] = useState([]);

	const colorMapping = {
		1: "#FFAC20",
		2: "#FF7246",
		3: "#FF4574",
		4: "#FF38EB",
		5: "#0684FE",
		6: "#33BE99",
	};

	useEffect(() => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/getContacts`, {
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
							console.log("Contacts:", newContacts);
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

	useEffect(() => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/getContactById?id=1`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.text().then((text) => {
					text = JSON.parse(text);
					const contact = text.contact;
					setYourAlias(contact.contact_alias);
					setYourName(contact.first_name);
					setYourLastName(contact.last_name);
					setYourColor(contact.color);
				});
			} else {
				console.log(response.status);
				response.text().then((text) => {
					console.log(text);
				});
			}
		});
	}, []);

	useEffect(() => {
		phoneNumbers.forEach((phone, index) => {
			console.log(`Phone ${index}:`, phone);
		});
		emails.forEach((email, index) => {
			console.log(`Email ${index}:`, email);
		});
		urls.forEach((url, index) => {
			console.log(`URL ${index}:`, url);
		});
		dates.forEach((date, index) => {
			console.log(`Date ${index}:`, date);
		});
	}, [phoneNumbers, emails, urls, dates]);

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

	const openDeleteModal = (contactId) => {
		setSelectedContactId(contactId);
		setDeleteModal(true);
	};

	const closeDeleteModal = () => {
		setDeleteModal(false);
	};

	const onCancel = () => {
		setDeleteModal(false);
		resetAllItems();
	};

	const resetAllItems = () => {
		setResetItem(Date.now());
	};

	const openGroupModal = async (contactId) => {
		const result = await fetchGroups(contactId);
		if (result) setGroupModal(true);
	};

	const closeGroupModal = () => {
		setGroupModal(false);
	};

	const onCancelGroup = () => {
		setGroupModal(false);
		resetAllItems();
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

	const addContact = () => {
		let newDates = [];
		dates.forEach((date, index) => {
			newDates.push({ ...date, date: `${date.date.getDate()}-${date.date.getMonth() + 1}-${date.date.getFullYear()}` });
		});
		console.log("Dates:", newDates);

		if (!firstName || phoneNumbers[0].phoneNumber === "" || phoneNumbers[0].phoneCode === "") {
			console.log("First name and phone number are required");
			return;
		}

		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/createContact`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				alias: alias,
				company: company,
				address: address,
				color: color,
				phones: phoneNumbers,
				emails: emails,
				dates: newDates,
				urls: urls,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					response.text().then((text) => {
						console.log(text);
						setContacts([
							...contacts,
							{
								id: JSON.parse(text).contactId,
								first_name: firstName,
								last_name: lastName,
								alias: alias,
								company: company,
								address: address,
								color: color,
								phones: phoneNumbers,
								emails: emails,
								dates: newDates,
								urls: urls,
							},
						]);
						closeModal();
					});
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
	};

	const deleteContact = (contactId) => {
		fetch(`${API_URL}:${API_PORT}/deleteContact`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contactId: contactId,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
					console.log(contactId);
					closeDeleteModal();
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
	};

	const onAccept = (contactId) => {
		deleteContact(contactId);
	};

	useEffect(() => {
		fetch(`${API_URL}:${API_PORT}/getAllContactsAndGroups`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 200) {
					response
						.json()
						.then((data) => {
							console.log("Data:", data);
							setContactsAndGroups(data);
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

	const fetchGroups = async (id) => {
		try {
			const response = await fetch(`${API_URL}:${API_PORT}/getGroups`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 200) {
				const fetchedGroups = await response.json();
				const filteredGroups = fetchedGroups.groups.filter((group) => {
					const groupContainsContact = contactsAndGroups.contacts.some((contactGroup) => {
						return contactGroup.group_id === group.id && contactGroup.contacts.includes(id);
					});
					return !groupContainsContact;
				});
				const formattedGroups = filteredGroups.map((group) => ({
					id: group.id,
					name: group.group_name,
					checked: false,
				}));
				setAllGroups(formattedGroups);
				return true;
			} else if (response.status === 401) {
				console.log("No session found");
				navigation.navigate("SignIn");
				return false;
			} else {
				console.log(response.status);
				const text = await response.text();
				console.log(text);
				return false;
			}
		} catch (error) {
			console.log("Error:", error);
			return false;
		}
	};

	const addToGroup = async () => {
		console.log("Adding to group");
		console.log("Selected contact ID:", selectedContactId);
		const selectedGroups = allGroups.filter((group) => group.checked);
		console.log("Selected groups:", selectedGroups);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Hello</Text>
			<Text style={styles.subtitle}>{yourAlias ? yourAlias : yourName}</Text>
			<View style={{ ...styles.userIcon, backgroundColor: colorMapping[yourColor] }}>
				<Text style={styles.firstNameInitial}>{yourAlias ? yourAlias[0].toUpperCase() : yourName ? yourName[0].toUpperCase() : "?"}</Text>
			</View>
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
				<ContactList
					contacts={filteredContacts}
					addToGroup={openGroupModal}
					deleteContact={openDeleteModal}
					navigation={navigation}
					reset={resetItem}
				/>
			</View>

			<CustomModal
				visible={modalVisible}
				closeModal={closeModal}
				title="New contact"
				cancelButtonName="Cancel"
				doneButtonName="Done"
				cancelButtonAction={closeModal}
				doneButtonAction={addContact}
				cancelButtonColor="#F50"
				doneButtonColor="#33BE99"
				modalContent={
					<View style={styles.modalContentContainer}>
						<View style={styles.carouselContainer}>
							<Carousel letter={firstName ? firstName[0].toUpperCase() : "?"} setIndex={setColor} />
						</View>
						<FlatList
							style={styles.list}
							ListHeaderComponent={
								<>
									<GrayInput placeholder="First name" style={styles.input} value={firstName} onChangeText={setFirstName} />
									<GrayInput placeholder="Last name" style={styles.input} onChangeText={setLastName} />
									<GrayInput placeholder="Alias" style={styles.input} onChangeText={setAlias} />
									<GrayInput placeholder="Company" style={styles.input} onChangeText={setCompany} />
									<GrayInput placeholder="Address" style={[styles.input, styles.lastInput]} onChangeText={setAddress} />
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
			<CustomModal
				visible={groupModal}
				closeModal={closeGroupModal}
				title={"Add to group"}
				cancelButtonName={"Cancel"}
				doneButtonName={"Add"}
				cancelButtonAction={onCancelGroup}
				doneButtonAction={addToGroup}
				cancelButtonColor="#F50000"
				doneButtonColor="#33BE99"
				modalContent={
					<Animated.View style={{ opacity: fadeAnim }}>
						<View style={styles.modalContainer}>
							<GrayInput placeholder="Search name of group" image={require("../../../../assets/images/Search.png")} />
							<View style={styles.list}>
								<List data={allGroups} setExternalList={setAllGroups} />
							</View>
						</View>
					</Animated.View>
				}
			/>
			<ConfirmationModal
				visible={deleteModal}
				image={require("../../../../assets/images/DeleteModal.png")}
				title="Delete contact"
				text="Are you sure you want to permanently delete the selected contact?"
				cancelButtonText="CANCEL"
				acceptButtonText="ACCEPT"
				onCancel={onCancel}
				onAccept={() => onAccept(selectedContactId)}
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
	modalContentContainer: {
		alignItems: "center",
	},
	modalContainer: {
		alignItems: "center",
	},
	list: {
		width: 415,
		height: 500,
		marginTop: 15,
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
	sectionTitle: {
		fontSize: 18,
		fontFamily: "BROmnyMedium",
		color: "#000",
		marginTop: 20,
		marginBottom: 10,
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
