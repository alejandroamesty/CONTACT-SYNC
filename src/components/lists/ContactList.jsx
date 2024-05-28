import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const renderLeftActions = (contactId, addToGroup) => {
	return (
		<View style={styles.leftActions}>
			<TouchableOpacity style={styles.addGroup} onPress={() => addToGroup(contactId)}>
				<Image source={require("../../../assets/images/AddGroup.png")} style={styles.actionIcon} />
			</TouchableOpacity>
		</View>
	);
};

const renderRightActions = (contactId, deleteContact) => {
	return (
		<View style={styles.rightActions}>
			<TouchableOpacity style={styles.delete} onPress={() => deleteContact(contactId)}>
				<Image source={require("../../../assets/images/Profile/Delete.png")} style={styles.actionIcon} />
			</TouchableOpacity>
		</View>
	);
};

const chooseColor = (index) => {
	switch (index) {
		case 1:
			return "#FFAC20";
		case 2:
			return "#FF7246";
		case 3:
			return "#FF4574";
		case 4:
			return "#FF38EB";
		case 5:
			return "#0684FE";
		case 6:
			return "#33BE99";
		default:
			return "#FFAC20";
	}
};

const ContactItem = ({ contact, addToGroup, deleteContact, onPress }) => {
	function handlePhone() {
		if (!contact.phone_code || !contact.phone_number) {
			return "";
		}
		return `+${contact.phone_code} ${contact.phone_number}`;
	}
	return (
		<Swipeable
			renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, contact.id, addToGroup)}
			renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, contact.id, deleteContact)}
		>
			<TouchableOpacity onPress={() => onPress(contact)}>
				<View style={styles.contactItem}>
					<View style={[styles.contactIcon, { backgroundColor: chooseColor(contact.color) }]}>
						<Text style={styles.contactIconText}>{contact.first_name[0].toUpperCase()}</Text>
					</View>
					<View style={styles.contactInfo}>
						<Text style={styles.contactName}>
							{contact.first_name} {contact.last_name}
						</Text>
						<Text style={styles.contactPhone}>{handlePhone()}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Swipeable>
	);
};

const ContactList = ({ contacts, addToGroup, deleteContact, navigation }) => {
	const handlePress = (contact) => {
		navigation.navigate("ContactDetail", { contact });
	};

	const sortedContacts = contacts.sort((a, b) => {
		const nameA = a.first_name.toUpperCase() + " " + a.last_name.toUpperCase();
		const nameB = b.first_name.toUpperCase() + " " + b.last_name.toUpperCase();
		return nameA.localeCompare(nameB);
	});

	const groupedContacts = sortedContacts.reduce((acc, contact) => {
		const firstLetter = contact.first_name[0].toUpperCase();
		if (!acc[firstLetter]) {
			acc[firstLetter] = [];
		}
		acc[firstLetter].push(contact);
		return acc;
	}, {});

	const sections = Object.keys(groupedContacts)
		.sort()
		.map((letter) => ({
			title: letter,
			data: groupedContacts[letter],
		}));

	const renderSeparator = () => {
		return <View style={styles.contactSeparator} />;
	};

	return (
		<FlatList
			data={sections}
			renderItem={({ item }) => (
				<>
					<Text style={styles.sectionHeader}>{item.title}</Text>
					{item.data.map((contact) => (
						<React.Fragment key={contact.id}>
							<ContactItem contact={contact} addToGroup={addToGroup} deleteContact={deleteContact} onPress={handlePress} />
							{renderSeparator()}
						</React.Fragment>
					))}
				</>
			)}
			keyExtractor={(item, index) => item.title + index}
			contentContainerStyle={styles.contactList}
		/>
	);
};

export default ContactList;

const styles = StyleSheet.create({
	contactList: {
		paddingHorizontal: 0,
	},
	contactItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#121B4A",
		height: 60,
		borderRadius: 20,
		padding: 12,
		marginHorizontal: 0,
	},
	contactIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
	},
	contactIconText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "bold",
	},
	contactInfo: {
		marginLeft: 10,
	},
	contactName: {
		fontFamily: "BROmnyMedium",
		fontWeight: "500",
		fontSize: 16,
		color: "#FFFFFF",
	},
	contactPhone: {
		fontFamily: "BROmnyRegular",
		fontWeight: "260",
		fontSize: 14,
		color: "#FFFFFF",
	},
	rightActions: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	leftActions: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	addGroup: {
		backgroundColor: "#0684FE",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		width: 60,
		height: 60,
	},
	delete: {
		backgroundColor: "#F4385A",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		width: 60,
		height: 60,
	},
	actionIcon: {
		width: 24,
		height: 24,
	},
	separator: {
		height: 12,
		backgroundColor: "transparent",
	},
	sectionHeader: {
		backgroundColor: "#030B38",
		color: "#535876",
		paddingVertical: 8,
		fontWeight: "bold",
		fontSize: 25,
	},
	contactSeparator: {
		height: 12,
		backgroundColor: "transparent",
	},
});
