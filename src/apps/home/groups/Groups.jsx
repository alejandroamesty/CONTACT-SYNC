import React, { useState, useRef, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, ScrollView, Animated } from "react-native";

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

const data = [
	{ id: 1, name: "Alejandro Ávila", checked: true },
	{ id: 2, name: "Victor Ávila", checked: true },
	{ id: 3, name: "Américo González", checked: true },
	{ id: 4, name: "Camila Borges", checked: true },
	{ id: 5, name: "José Bracho", checked: true },
	{ id: 6, name: "Bruno Melga", checked: false },
	{ id: 7, name: "Carlos Arámbulo", checked: true },
	{ id: 8, name: "Camila Borges", checked: true },
	{ id: 9, name: "Colegio Claret", checked: true },
	{ id: 10, name: "Luis Crespo", checked: false },
];

const Groups = () => {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="Groups">
				<Stack.Screen name="Groups" options={{ headerShown: false }}>
					{(props) => <GroupsScreen {...props} />}
				</Stack.Screen>
				<Stack.Screen name="GroupDetail" component={GroupDetail} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const GroupsScreen = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}:${API_PORT}/getGroups`, {
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
							onPress={() => navigation.navigate("GroupDetail", { group })}
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
				doneButtonAction={currentStep === 1 ? goToNextStep : closeModal}
				cancelButtonColor={currentStep === 1 ? "#F50000" : "#7D7D7D"}
				doneButtonColor="#33BE99"
				modalContent={
					<Animated.View style={{ opacity: fadeAnim }}>
						{currentStep === 1 ? (
							<View style={styles.modalContainer}>
								<GrayInput placeholder="Search name or number" image={require("../../../../assets/images/Search.png")} />
								<View style={styles.list}>
									<List data={data} />
								</View>
							</View>
						) : (
							<View>
								<View style={styles.carouselContainer}>
									<Carousel image={require("../../../../assets/images/GroupCard/Group.png")} />
								</View>
								<View style={styles.inputContact}>
									<GrayInput placeholder="Group name" style={styles.input} />
									<GrayInput placeholder="Description" style={styles.lastInput} height={78} borderRadius={18} />
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
		maxWidth: 800,
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
