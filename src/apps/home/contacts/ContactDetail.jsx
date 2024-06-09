import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import NewTextButton from "../../../components/buttons/NewTextButton";
import InfoContainer from "../../../components/InfoContainer";
import AddButton from "../../../components/buttons/AddButton";
import PhoneInput from "../../../components/inputs/PhoneInput";
import EmailInput from "../../../components/inputs/EmailInput";
import URLInput from "../../../components/inputs/URLInput";
import GrayInput from "../../../components/inputs/GrayInput";
import Carousel from "../../../components/Carousel";
import CustomModal from "../../../components/modals/CustomModal";
import DateInput from "../../../components/inputs/DateInput";
import { API_URL, API_PORT } from "@env";

const ContactDetail = ({ route, navigation: { goBack } }) => {
	const { contact } = route.params;
	const { id } = contact;

	const [color, setColor] = useState(contact.color);
	const [firstName, setFirstName] = useState(contact.first_name);
	const [lastName, setLastName] = useState(contact.last_name);
	const [alias, setAlias] = useState(contact.contact_alias || "");
	const [company, setCompany] = useState(contact.company || "");
	const [address, setAddress] = useState(contact.address || "");
	const [modalVisible, setModalVisible] = useState(false);

	const [phoneNumbers, setPhoneNumbers] = useState([]);
	const [emails, setEmails] = useState([]);
	const [urls, setURLs] = useState([]);
	const [dates, setDates] = useState([]);

	const [displayPhones, setDisplayPhones] = useState([]);
	const [displayEmails, setDisplayEmails] = useState([]);
	const [displayURLs, setDisplayURLs] = useState([]);
	const [displayDates, setDisplayDates] = useState([]);

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
		fetch(`${API_URL}${API_PORT ? ":" + API_PORT : ""}/getContactById?id=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 200) {
					response
						.text()
						.then((fetchedContact) => {
							fetchedContact = JSON.parse(fetchedContact);
							const { contact } = fetchedContact;
							if (contact) {
								setFirstName(contact.first_name);
								setLastName(contact.last_name);
								setAlias(contact.contact_alias || "");
								setCompany(contact.company || "");
								setAddress(contact.address || "");

								setDisplayPhones(contact.phones || []);
								setDisplayEmails(contact.emails || []);
								setDisplayURLs(contact.urls || []);
								setDisplayDates(contact.dates || []);

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
									typeLabel: urlMapping[url.type] || "website",
									type: url.type || 1,
									url: url.url || "",
								}));
								console.log("Formatted URLs:", formattedUrls);
								setURLs(formattedUrls);
							}
						})
						.catch((error) => {
							console.log("Error parsing response:", error);
						});
				} else if (response.status === 401) {
					console.log("No session found");
					navigation.navigate("SignIn");
				} else {
					console.log("Error:", response.status);
					response.text().then((text) => {
						console.log(text);
					});
				}
			})
			.catch((error) => {
				console.log("Fetch error:", error);
			});
	}, [id]);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
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
				response.text().then((text) => {
					closeModal();
				});
			} else {
				console.log("Error:", response.status);
				response.text().then((text) => {
					console.log(text);
				});
			}
		});
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
		<View style={styles.container}>
			<View style={styles.editButton}>
				<NewTextButton onPress={openModal} buttonText={"Edit"} />
			</View>

			<View style={styles.goBackButton}>
				<NewTextButton onPress={() => goBack()} buttonText={"< Back"} />
			</View>
			<View style={styles.contactContainer}>
				<View style={[styles.userIcon, { backgroundColor: colorMapping[color] }]}>
					<Text style={styles.firstNameInitial}>{firstName[0] || "?"}</Text>
				</View>
				<Text style={styles.name}>
					{firstName && lastName ? `${firstName} ${lastName}` : "Create your contact card"}
				</Text>
				<Text style={styles.alias}>{alias ? `"${alias}"` : "" || 'Go to "Profile" and click the edit button'}</Text>
			</View>
			<ScrollView style={styles.container} indicatorStyle="white">
				<View style={styles.infoContainer}>
					<InfoContainer name="company" info={company} style={{ marginBottom: 10 }} />
					<InfoContainer name="address" info={address} style={{ marginBottom: 10 }} />
					{displayPhones.map((phone, index) => (
						<InfoContainer
							key={index}
							name={phone.phone_type ? phoneMapping[phone.phone_type] : "Phone"}
							info={`${phone.phone_code} ${phone.phone_number}`}
							style={{ marginBottom: 10 }}
						/>
					))}
					{displayEmails.map((email, index) => (
						<InfoContainer
							key={index}
							name={email.email_type ? emailMapping[email.email_type] : "email"}
							info={email.email_direction}
							style={{ marginBottom: 10 }}
						/>
					))}
					{displayURLs.map((url, index) => (
						<InfoContainer key={index} name={url ? urlMapping[url.type] : "URL"} info={url.url} style={{ marginBottom: 10 }} />
					))}
					{displayDates.map((date, index) => (
						<InfoContainer key={index} name="Date" info={new Date(date.contact_date).toLocaleDateString()} style={{ marginBottom: 10 }} />
					))}
				</View>
			</ScrollView>

			<CustomModal
				visible={modalVisible}
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
							<Carousel letter={firstName ? firstName[0].toUpperCase() : "?"} defaultColor={colorMapping[color]} setIndex={setColor} />
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
									<GrayInput placeholder="Alias" style={styles.input} value={alias} onChangeText={setAlias} defaultValue={alias} characterLimit={15} />
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
										style={[styles.input, styles.lastInput]}
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
		</View>
	);
};

export default ContactDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#030B38",
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
	},
	contactContainer: {
		alignItems: "center",
		marginTop: 60,
		marginBottom: 30,
	},
	userIcon: {
		width: 121,
		height: 121,
		borderRadius: 60.5,
		backgroundColor: "#FF6189",
		justifyContent: "center",
		alignItems: "center",
	},
	firstNameInitial: {
		fontFamily: "BROmnyMedium",
		fontSize: 60,
		lineHeight: 79,
		textAlign: "center",
		color: "#FFFFFF",
	},
	name: {
		fontFamily: "BROmnyMedium",
		fontSize: 25,
		marginTop: 20,
		textAlign: "center",
		color: "#FFFFFF",
		marginBottom: 4,
	},
	alias: {
		fontFamily: "BROmnyRegular",
		fontSize: 20,
		lineHeight: 26,
		textAlign: "center",
		color: "#737791",
	},
	infoContainer: {
		alignItems: "center",
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
});
