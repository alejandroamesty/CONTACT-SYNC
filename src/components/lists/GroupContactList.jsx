import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import GroupSwipe from "./GroupSwipe";

const GroupContactList = ({ contacts, navigation, reset, deleteContactFromGroup }) => {
    const handlePress = (contact) => {
        navigation.navigate("ContactDetail", { contact });
    };

    const sortedContacts = contacts.sort((a, b) => {
        const nameA =
            a.first_name.toUpperCase() + " " + a.last_name.toUpperCase();
        const nameB =
            b.first_name.toUpperCase() + " " + b.last_name.toUpperCase();
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
                            <GroupSwipe
                                item={contact}
                                onDeleteRight={deleteContactFromGroup}
                                onPress={handlePress}
                                reset={reset}
                            />
                            {renderSeparator()}
                        </React.Fragment>
                    ))}
                </>
            )}
            keyExtractor={(item, index) => item.title + index}
            contentContainerStyle={styles.contactList}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    contactList: {
        paddingHorizontal: 0,
    },
    contactSeparator: {
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
});

export default GroupContactList;
