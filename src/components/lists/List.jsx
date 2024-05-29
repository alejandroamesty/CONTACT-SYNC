import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListItem = ({ item, handleCheck }) => {
	return (
		<View style={styles.itemContainer}>
			<Text style={styles.itemText}>{item.name}</Text>
			<TouchableOpacity onPress={() => handleCheck(item.id)}>
				{item.checked ? (
					<Icon name="check-circle" size={20} color="#33BE99" />
				) : (
					<Icon name="radio-button-unchecked" size={20} color="#000000" />
				)}
			</TouchableOpacity>
		</View>
	);
};

const List = ({ data }) => {
	const [items, setItems] = useState(data);

	const handleCheck = (id) => {
		const newItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
		setItems(newItems);
	};

	const alphabet = [...new Set(items.map((item) => item.name[0]))].sort();

	const renderSeparator = () => {
		return <View style={styles.separator} />;
	};

	return (
		<FlatList
			data={alphabet}
			renderItem={({ item }) => (
				<View>
					<Text style={styles.letter}>{item}</Text>
					{items
						.filter((i) => i.name.startsWith(item))
						.map((filteredItem, index) => (
							<React.Fragment key={filteredItem.id}>
								<ListItem item={filteredItem} handleCheck={handleCheck} />
								{index < items.filter((i) => i.name.startsWith(item)).length - 1 && renderSeparator()}
							</React.Fragment>
						))}
				</View>
			)}
			keyExtractor={(item) => item}
			contentContainerStyle={styles.container}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 29,
	},
	letter: {
		fontFamily: "BROmnySemiBold",
		fontStyle: "normal",
		fontSize: 16,
		lineHeight: 18,
		color: "#7D7D7D",
		marginTop: 16,
	},
	separator: {
		width: "100%",
		height: 1,
		backgroundColor: "#747474",
		marginVertical: 8,
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 5,
		width: "100%",
	},
	itemText: {
		fontFamily: "BROmnyMedium",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 16,
		lineHeight: 18,
		color: "#000000",
	},
});

export default List;
