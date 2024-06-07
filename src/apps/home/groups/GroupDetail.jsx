import React, { useEffect, useState, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Image, FlatList, Animated } from "react-native";
import { API_URL, API_PORT } from "@env";
import ContactList from "../../../components/lists/ContactList";
import BlueInput from "../../../components/inputs/BlueInput";
import SmallAddButton from "../../../components/buttons/SmallAddButton";
import CustomModal from "../../../components/modals/CustomModal";
import GrayInput from "../../../components/inputs/GrayInput";
import List from "../../../components/lists/List";
import Carousel from "../../../components/Carousel";
import NewTextButton from "../../../components/buttons/NewTextButton";

const GroupDetail = ({ route }) => {
	const [allContacts, setAllContacts] = useState([]);
	const [contacts, setContacts] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [newGroupName, setNewGroupName] = useState("");
	const [newGroupDescription, setNewGroupDescription] = useState("");
	const [groupColor, setGroupColor] = useState(1);
	const [modalVisible, setModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const { navigation } = route.params;
	const { id } = route.params.group;
	const [group_name, setGroupName] = useState(route.params.group.group_name);
	const [group_description, setGroupDescription] = useState(route.params.group.group_description);
	const [color, setColor] = useState(route.params.group.color);
	const [contactCount, setContactCount] = useState(route.params.group.contactCount);
	const iconName = route.params.iconName;
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const colors = [
		{ id: 1, color: "#FFAC20" },
		{ id: 2, color: "#FF7246" },
		{ id: 3, color: "#FF4574" },
		{ id: 4, color: "#FF38EB" },
		{ id: 5, color: "#0684FE" },
		{ id: 6, color: "#33BE99" },
	];
	const colorMapping = {
		1: "#FFAC20",
		2: "#FF7246",
		3: "#FF4574",
		4: "#FF38EB",
		5: "#0684FE",
		6: "#33BE99",
	};
	const iconSource = {
		Favorites: require("../../../../assets/images/GroupCard/Favorites.png"),
		Emergency: require("../../../../assets/images/GroupCard/Emergency.png"),
		Group: require("../../../../assets/images/GroupCard/Group.png"),
	}[iconName];

	useEffect(() => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/getContactsByGroup?id=${id}`, {
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
							filterContactsInGroupFromAll(newContacts);
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
	}, [contacts]);

	const filterContactsInGroupFromAll = (contactsParams) => {
		if (!contactsParams) {
			contactsParams = allContacts;
		}
		// remove contacts in group from all contacts by comparing the ids and set the result to allContacts
		const newContacts = contactsParams.filter((contact) => {
			return !contacts.some((contactInGroup) => contactInGroup.id === contact.id);
		});
		setAllContacts(newContacts);
	};

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

	const openEditModal = () => {
		setEditModalVisible(true);
	};

	const closeEditModal = () => {
		setEditModalVisible(false);
	};

	const updateGroup = () => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/getContactsByGroup?id=${id}`, {
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
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	};

	const addMembers = () => {
		const selectedContacts = [];
		let contactSum = 0;
		allContacts.forEach((contact) => {
			if (contact.checked) {
				selectedContacts.push(contact.id);
				contactSum++;
			}
		});
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/InsertMultipleContactToGroup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contactIds: selectedContacts,
				groupId: id,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					response.text().then((text) => {
						console.log(text);
						updateGroup();
						closeModal();
						setContactCount(contactSum + contactCount);
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

	const editGroup = () => {
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/updateGroup`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				groupName: newGroupName === "" ? group_name : newGroupName,
				color: groupColor,
				groupDescription: newGroupDescription,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					response.text().then((text) => {
						setGroupName(newGroupName);
						setGroupDescription(newGroupDescription);
						setColor(groupColor);
						updateGroup();
						closeEditModal();
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

	const deleteFromGroup = () => {
		console.log("deleteFromGroup");
	};

	return (
		<FlatList
			data={[filteredContacts]}
			style={{ backgroundColor: "#030B38" }}
			ListHeaderComponent={
				<View style={styles.container}>
					{id > 2 && (
						<View style={styles.editButton}>
							<NewTextButton onPress={openEditModal} buttonText={"Edit >"} />
						</View>
					)}

					<View style={styles.goBackButton}>
						<NewTextButton
							onPress={() => {
								navigation.navigate("Groups");
							}}
							buttonText={"< Back"}
						/>
					</View>

					<View style={[styles.colorCircle, { backgroundColor: colors[color - 1].color }]}>
						{<Image source={iconSource} style={styles.image} />}
					</View>

					<Text style={styles.groupName}>{group_name}</Text>

					{group_description && (
						<View style={styles.description}>
							<Text
								style={{
									color: "#FFF",
									paddingLeft: 15,
									paddingTop: 15,
									paddingBottom: 5,
									color: "#737791",
									fontFamily: "BROmnyRegular",
								}}
							>
								description
							</Text>
							<Text style={{ color: "#FFF", paddingLeft: 15, paddingBottom: 15, fontFamily: "BROmnyRegular" }}>
								{group_description}
							</Text>
						</View>
					)}
					<View style={styles.member_addContainer}>
						<Text style={styles.memberCount}>{`${contactCount} ` + (contactCount === 1 ? "member" : "members")}</Text>
						<SmallAddButton onPress={openModal} buttonText={"add"} />
					</View>

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
				</View>
			}
			renderItem={() => (
				<View style={styles.contactsContainer}>
					<ContactList contacts={filteredContacts} addToGroup={() => {}} deleteContact={deleteFromGroup} navigation={navigation} />
				</View>
			)}
			ListFooterComponent={
				<>
					<CustomModal
						visible={modalVisible}
						closeModal={closeModal}
						title={"Add members"}
						cancelButtonName={"Cancel"}
						doneButtonName={"Add"}
						cancelButtonAction={closeModal}
						doneButtonAction={addMembers}
						cancelButtonColor="#F50000"
						doneButtonColor="#33BE99"
						modalContent={
							<Animated.View style={{ opacity: fadeAnim }}>
								<View style={styles.modalContainer}>
									<GrayInput placeholder="Search name or number" image={require("../../../../assets/images/Search.png")} />
									<View style={styles.list}>
										<List data={allContacts} setExternalList={setAllContacts} />
									</View>
								</View>
							</Animated.View>
						}
					/>
					<CustomModal
						visible={editModalVisible}
						closeModal={closeEditModal}
						title={"Edit Group"}
						cancelButtonName={"Cancel"}
						doneButtonName={"Edit"}
						cancelButtonAction={closeEditModal}
						doneButtonAction={editGroup}
						cancelButtonColor="#F50000"
						doneButtonColor="#33BE99"
						modalContent={
							<View>
								<View style={styles.carouselContainer}>
									<Carousel
										image={require("../../../../assets/images/GroupCard/Group.png")}
										setIndex={setGroupColor}
										defaultColor={colorMapping[color]}
									/>
								</View>
								<View style={styles.inputContact}>
									<GrayInput
										placeholder={group_name}
										style={styles.firstInput}
										onChangeText={setNewGroupName}
										defaultValue={group_name}
									/>
									<GrayInput
										defaultValue={group_description}
										placeholder={group_description ? group_description : ""}
										style={styles.lastInput}
										height={78}
										borderRadius={18}
										onChangeText={setNewGroupDescription}
									/>
								</View>
							</View>
						}
					/>
				</>
			}
		/>
	);
};

export default GroupDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#030B38",
		alignItems: "center",
	},
	groupName: {
		marginTop: 25,
		fontSize: 24,
		color: "#FFF",
	},
	colorCircle: {
		width: 121,
		height: 121,
		borderRadius: 60.5,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 60,
	},
	image: {
		width: 50,
		height: 46,
		resizeMode: "contain",
	},
	member_addContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: "5%",
	},
	memberCount: {
		color: "#FFF",
		color: "#FFFFFF",
		fontFamily: "BROmnyRegular",
		fontSize: 25,
	},
	description: {
		marginTop: 20,
		width: "90%",
		backgroundColor: "#121B4A",
		borderRadius: 18,
	},
	contactsContainer: {
		paddingLeft: 20,
		paddingRight: 20,
		width: "100%",
		backgroundColor: "#030B38",
	},
	editButton: {
		position: "absolute",
		right: 10,
		top: 20,
	},
	goBackButton: {
		position: "absolute",
		left: 10,
		top: 20,
	},
	carouselContainer: {
		marginLeft: -20,
		marginRight: -20,
	},
	inputContact: {
		marginTop: 20,
		alignSelf: "center",
	},
	firstInput: {
		marginBottom: 12,
	},
	lastInput: {
		marginBottom: 244,
	},
});
