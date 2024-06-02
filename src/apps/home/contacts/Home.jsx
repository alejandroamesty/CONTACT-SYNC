import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { API_URL, API_PORT } from "@env";

import ContactDetail from "./ContactDetail";

import ControlButton from "../../../components/buttons/ControlButton";
import ContactList from "../../../components/lists/ContactList";
import AddButton from "../../../components/buttons/AddButton";
import PhoneInput from "../../../components/inputs/PhoneInput";
import ComboInput from "../../../components/inputs/ComboInput";
import BlueInput from "../../../components/inputs/BlueInput";
import GrayInput from "../../../components/inputs/GrayInput";
import Carousel from "../../../components/Carousel";
import CustomModal from "../../../components/modals/CustomModal";
import DateInput from "../../../components/inputs/DateInput";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([{ type: "home", countryCode: "", number: "" }]);
    const [emails, setEmails] = useState([]);
    const [urls, setURLs] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}:${API_PORT}/getContacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    response.text().then((fetchedContacts) => {
                        fetchedContacts = JSON.parse(fetchedContacts);
                        const newContacts = [];
                        fetchedContacts.contacts.forEach((contact) => {
                            if (contact.id !== 1) {
                                newContacts.push(contact);
                            }
                        });
                        setContacts(newContacts);
                    }).catch((error) => {
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
            }).catch((error) => {
                console.log("Error:", error);
            });
    }, []);

    const filteredContacts = useMemo(() =>
        contacts.filter((contact) =>
            contact.first_name.toLowerCase().includes(searchText.toLowerCase())
        ), [contacts, searchText]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, { type: "home", countryCode: "", number: "" }]);
    };

    const setPhone = (index, newPhone) => {
        const updatedPhones = phoneNumbers.map((phone, i) =>
            i === index ? newPhone : phone
        );
        setPhoneNumbers(updatedPhones);
    };

    const removePhone = (index) => {
        const updatedPhones = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(updatedPhones);
    };

    const addEmail = () => {
        setEmails([...emails, { type: "home", email: "" }]);
    };

    const setEmail = (index, newEmail) => {
        const updatedEmails = emails.map((email, i) =>
            i === index ? newEmail : email
        );
        setEmails(updatedEmails);
    };

    const removeEmail = (index) => {
        const updatedEmails = emails.filter((_, i) => i !== index);
        setEmails(updatedEmails);
    };

    const addURL = () => {
        setURLs([...urls, { type: "home", url: "" }]);
    };

    const setURL = (index, newURL) => {
        const updatedURLs = urls.map((url, i) =>
            i === index ? newURL : url
        );
        setURLs(updatedURLs);
    };

    const removeURL = (index) => {
        const updatedURLs = urls.filter((_, i) => i !== index);
        setURLs(updatedURLs);
    };

    const addDate = () => {
        setDates([...dates, { type: "birthday", date: new Date() }]);
    }    

    const setDate = (index, newDate) => {
        const updatedDates = dates.map((date, i) =>
            i === index ? newDate : date
        );
        setDates(updatedDates);
    }

    const removeDate = (index) => {
        const updatedDates = dates.filter((_, i) => i !== index);
        setDates(updatedDates);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello</Text>
            <Text style={styles.subtitle}>Alejandro Ávila</Text>

            <Text style={styles.undertitle}>Contacts</Text>

            <ControlButton
                source={require("../../../../assets/images/Add.png")}
                size={36}
                style={styles.add}
                onPress={openModal}
            />

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
                    addToGroup={() => {}}
                    deleteContact={() => {}}
                    navigation={navigation}
                />
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
                    <View style={styles.modalContentContainer}>
                        <View style={styles.carouselContainer}>
                            <Carousel letter={firstName ? firstName[0].toUpperCase() : "?"} />
                        </View>
                        <FlatList
                            style={styles.list}
                            ListHeaderComponent={() => (
                                <>
                                    <GrayInput
                                        placeholder="First name"
                                        style={styles.input}
                                        value={firstName}
                                        onChangeText={setFirstName}
                                    />
                                    <GrayInput placeholder="Last name" style={styles.input} />
                                    <GrayInput placeholder="Alias" style={styles.input} />
                                    <GrayInput placeholder="Company" style={styles.input} />
                                    <GrayInput placeholder="Address" style={[styles.input, styles.lastInput]} />
                                </>
                            )}
                            ListFooterComponent={() => (
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
                                        <ComboInput
                                            key={index}
                                            options={[
                                                { label: "home", value: "home" },
                                                { label: "work", value: "work" },
                                                { label: "school", value: "school" },
                                                { label: "office", value: "office" },
                                            ]}
                                            value={email.email}
                                            selectedValue={email.type}
                                            placeholder={"Email"}
                                            onChangeText={(newEmail) => setEmail(index, { ...email, email: newEmail })}
                                            onRemove={() => removeEmail(index)}
                                            index={index}
                                            onSelect={(type) => setEmail(index, { ...email, type })}
                                        />
                                    ))}
                                    <AddButton onPress={addEmail} buttonText="add email" />
                                    <Text style={styles.sectionTitle}>URLs</Text>
                                    {urls.map((url, index) => (
                                        <ComboInput
                                            key={index}
                                            options={[
                                                { label: "home", value: "home" },
                                                { label: "work", value: "work" },
                                                { label: "school", value: "school" },
                                                { label: "office", value: "office" },
                                            ]}
                                            value={url.url}
                                            selectedValue={url.type}
                                            placeholder={"URL"}
                                            onChangeText={(newURL) => setURL(index, { ...url, url: newURL })}
                                            onRemove={() => removeURL(index)}
                                            index={index}
                                            onSelect={(type) => setURL(index, { ...url, type })}
                                        />
                                    ))}
                                    <AddButton onPress={addURL} buttonText="add URL" />
                                    <Text style={styles.sectionTitle}>Dates</Text>
                                    {dates.map((date, index) => (
                                        <DateInput
                                            key={index}
                                            options={[
                                                { label: "birthday", value: "birthday" },
                                                { label: "anniversary", value: "anniversary" },
                                                { label: "other", value: "other" },
                                            ]}
                                            value={date.date}
                                            selectedValue={date.type}
                                            placeholder={"Date"}
                                            onRemove={() => removeDate(index)}
                                            index={index}
                                            onSelect={(type) => setDate(index, { ...date, type })}
                                            onChangeText={(newDate) => setDate(index, { ...date, date: newDate })}
                                        />
                                    ))}
                                    <AddButton onPress={addDate} buttonText="add date" />
                                </>
                            )}
                        />
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
    modalContentContainer: {
        alignItems: "center",
    },
    list: {
        marginTop: 20,
        height: 366,
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
