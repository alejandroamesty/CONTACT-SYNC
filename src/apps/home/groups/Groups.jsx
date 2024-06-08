import React, { useState, useRef, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, ScrollView, Animated } from "react-native";

import ContactDetail from "../contacts/ContactDetail";
import ControlButton from "../../../components/buttons/ControlButton";
import BlueInput from "../../../components/inputs/BlueInput";
import GroupCard from "../../../components/buttons/GroupCard";
import CustomModal from "../../../components/modals/CustomModal";
import Carousel from "../../../components/Carousel";
import GrayInput from "../../../components/inputs/GrayInput";
import List from "../../../components/lists/List";
import { API_URL, API_PORT } from "@env";

import GroupDetail from "./GroupDetail";

const Stack = createStackNavigator();

const Groups = () => {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="Groups">
				<Stack.Screen name="Groups" options={{ headerShown: false }}>
					{(props) => <GroupsScreen {...props} />}
				</Stack.Screen>
				<Stack.Screen name="GroupDetail" component={GroupDetail} options={{ headerShown: false }} />
				<Stack.Screen name="ContactDetail" component={ContactDetail} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const GroupsScreen = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const [groups, setGroups] = useState([]);
	const [contacts, setContacts] = useState([]);
	const [groupName, setGroupName] = useState("");
	const [groupDescription, setGroupDescription] = useState("");
	const [groupColor, setGroupColor] = useState(1);
	const [updateGroups, setUpdateGroups] = useState(false);

	useEffect(() => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/getGroups`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 200) {
					response
						.text()
						.then((fetchedGroups) => {
							fetchedGroups = JSON.parse(fetchedGroups);
							const newGroups = [];
							fetchedGroups.groups.forEach((group) => {
								newGroups.push(group);
							});
							setGroups(newGroups);
							setUpdateGroups(true);
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
									const contactData = {
										id: contact.id,
										name: contact.first_name + (contact.last_name ? " " + contact.last_name : ""),
										checked: false,
									};
									newContacts.push(contactData);
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

	useEffect(() => {
		if (updateGroups) {
			sortGroups();
			setUpdateGroups(false);
		}
	}, [groups]);

	const openModal = () => {
		setModalVisible(true);
		setCurrentStep(1);
		fadeAnim.setValue(1);
	};

	const closeModal = () => {
		setModalVisible(false);
		setCurrentStep(1);
	};

	const goToNextStep = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setCurrentStep(2);
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		});
	};

	const sortGroups = () => {
		// Sort the groups in groups state alphabetically by name except for the first two groups
		const sortedGroups = [...groups];
		sortedGroups.sort((a, b) => {
			if (a.id === 2 || a.id === 1) {
				return -1;
			} else if (b.id === 2 || b.id === 1) {
				return 1;
			} else {
				return a.group_name.localeCompare(b.group_name);
			}
		});
		setGroups(sortedGroups);
	};

	const createGroup = () => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/createGroup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: groupName,
				description: groupDescription,
				color: groupColor,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					groupContacts = [];
					response.json().then((response) => {
						let newContactCount = 0;
						contacts.forEach((contact) => {
							if (contact.checked) {
								groupContacts.push(contact.id);
								newContactCount++;
							}
						});
						fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/InsertMultipleContactToGroup`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								groupId: response.group_id,
								contactIds: groupContacts,
							}),
						})
							.then((response) => {
								if (response.status === 200) {
									console.log("Group created successfully");
									closeModal();

									// Add the new group to the existing groups array
									const newGroup = {
										id: response.group_id,
										group_name: groupName,
										group_description: groupDescription,
										color: groupColor,
										contactCount: newContactCount,
									};
									setUpdateGroups(true);
									setGroups([...groups, newGroup]);
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
	};

	const goToPreviousStep = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setCurrentStep(1);
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Groups</Text>

			<ControlButton source={require("../../../../assets/images/Add.png")} size={36} style={styles.add} onPress={openModal} />
			<BlueInput
				style={styles.searchInput}
				placeholder="Search"
				width={366}
				height={60}
				fontSize={18}
				image={require("../../../../assets/images/Search.png")}
				backgroundColor="#030B38"
			/>

			<View style={styles.scrollViewContainer}>
				<ScrollView contentContainerStyle={styles.groupCards}>
					{groups.map((group) => (
						<GroupCard
							key={group.id}
							iconName={group.id === 1 ? "Emergency" : group.id === 2 ? "Favorites" : "Group"}
							groupName={group.group_name}
							contactCount={group.contactCount}
							backgroundColor={group.color}
							onPress={() =>
								navigation.navigate("GroupDetail", {
									group,
									iconName: group.id === 1 ? "Emergency" : group.id === 2 ? "Favorites" : "Group",
									navigation,
								})
							}
						/>
					))}
				</ScrollView>
			</View>

			<CustomModal
				visible={modalVisible}
				closeModal={closeModal}
				title={currentStep === 1 ? "Add members" : "New group"}
				cancelButtonName={currentStep === 1 ? "Cancel" : "Back"}
				doneButtonName={currentStep === 1 ? "Next" : "Create"}
				cancelButtonAction={currentStep === 1 ? closeModal : goToPreviousStep}
				doneButtonAction={currentStep === 1 ? goToNextStep : createGroup}
				cancelButtonColor={currentStep === 1 ? "#F50000" : "#7D7D7D"}
				doneButtonColor="#33BE99"
				modalContent={
					<Animated.View style={{ opacity: fadeAnim }}>
						{currentStep === 1 ? (
							<View style={styles.modalContainer}>
								<GrayInput placeholder="Search name or number" image={require("../../../../assets/images/Search.png")} />
								<View style={styles.list}>
									<List data={contacts} setExternalList={setContacts} />
								</View>
							</View>
						) : (
							<View>
								<View style={styles.carouselContainer}>
									<Carousel image={require("../../../../assets/images/GroupCard/Group.png")} setIndex={setGroupColor} />
								</View>
								<View style={styles.inputContact}>
									<GrayInput placeholder="Group name" style={styles.input} onChangeText={setGroupName} />
									<GrayInput
										placeholder="Description"
										style={styles.lastInput}
										height={78}
										borderRadius={18}
										onChangeText={setGroupDescription}
									/>
								</View>
							</View>
						)}
					</Animated.View>
				}
			/>
		</View>
	);
};

export default Groups;

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
	searchInput: {
		position: "absolute",
		top: 104,
	},
	add: {
		position: "absolute",
		left: 355,
		top: 49,
	},
	scrollViewContainer: {
		flex: 1,
		marginTop: 190,
		width: "100%",
	},
	groupCards: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		paddingHorizontal: 25,
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
		marginBottom: 244,
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
	nameInitial: {
		position: "absolute",
		fontFamily: "BROmnyMedium",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 24,
		alignSelf: "center",
		color: "#FFFFFF",
	},
	listContainer: {
		flex: 1,
		backgroundColor: "#030B38",
		justifyContent: "center",
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
});
