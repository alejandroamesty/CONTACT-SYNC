import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, FlatList } from "react-native";
import ControlButton from "../../../components/buttons/ControlButton";
import { CameraView, useCameraPermissions } from "expo-camera";
import { API_URL, API_PORT } from "@env";

import BlueInput from "../../../components/inputs/BlueInput";
import NewTextButton from "../../../components/buttons/NewTextButton";
import QRCode from "react-native-qrcode-svg";
import CustomModal from "../../../components/modals/CustomModal";
import GrayInput from "../../../components/inputs/GrayInput";
import PhoneInput from "../../../components/inputs/PhoneInput";
import EmailInput from "../../../components/inputs/EmailInput";
import URLInput from "../../../components/inputs/URLInput";
import DateInput from "../../../components/inputs/DateInput";
import AddButton from "../../../components/buttons/AddButton";
import Carousel from "../../../components/Carousel";

const containerWidth = Dimensions.get("window").width * 0.75;
const otherWidth = Dimensions.get("window").width * 0.6;
const Scanner = () => {
	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [openScanner, setOpenScanner] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [alias, setAlias] = useState("");
	const [company, setCompany] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumbers, setPhoneNumbers] = useState([]);
	const [emails, setEmails] = useState([]);
	const [urls, setURLs] = useState([]);
	const [dates, setDates] = useState([]);
	const [color, setColor] = useState(1);

	const [yourName, setYourName] = useState("");
	const [firstLetter, setFirstLetter] = useState("?");
	const [yourColor, setYourColor] = useState(1);

	const colors = ["#FFAC20", "#FF7246", "#FF4574", "#FF38EB", "#0684FE", "#33BE99"];

	const colorMapping = {
		1: "#FFAC20",
		2: "#FF7246",
		3: "#FF4574",
		4: "#FF38EB",
		5: "#0684FE",
		6: "#33BE99",
	};

	const [qrValue, setQRValue] = useState(`{
	firstName: "",
	lastName: "",
	alias: "",
	company: "",
	address: "",
	color: "",
	phones: [],
	emails: [],
	urls: [],
	dates: [],
}`);

	useEffect(() => {
		fetch(`${API_URL}:${API_PORT}/getContactById?id=1`)
			.then((response) => response.json())
			.then((data) => {
				setQRValue(
					`{
						"first_name": "${data.contact.first_name}",
						"last_name": "${data.contact.last_name}",
						"alias": "${data.contact.contact_alias}",
						"company": "${data.contact.company}",
						"address": "${data.contact.address}",
						"color": ${data.contact.color},
						"phones": ${JSON.stringify(data.contact.phones)},
						"emails": ${JSON.stringify(data.contact.emails)},
						"urls": ${JSON.stringify(data.contact.urls)},
						"dates": ${JSON.stringify(data.contact.dates)}
					}`
				);
				setYourName(data.contact.contact_alias ? data.contact.contact_alias : `${data.contact.first_name} ${data.contact.last_name}`);
				setFirstLetter(
					data.contact.contact_alias
						? data.contact.contact_alias
							? data.contact.contact_alias[0]
							: "?"
						: data.contact.first_name
						? data.contact.first_name[0]
						: "?"
				);
				setYourColor(data.contact.color ? data.contact.color : 1);
			});
	}, []);

	const emailTypes = [
		{ id: 1, label: "home", value: "home" },
		{ id: 2, label: "work", value: "work" },
		{ id: 3, label: "school", value: "school" },
		{ id: 4, label: "office", value: "office" },
		{ id: 5, label: "other", value: "other" },
	];

	const phoneTypes = [
		{ id: 1, label: "home", value: "home" },
		{ id: 2, label: "mobile", value: "mobile" },
		{ id: 3, label: "work", value: "work" },
	];

	const urlTypes = [
		{ id: 1, label: "website", value: "website" },
		{ id: 2, label: "Instagram", value: "Instagram" },
		{ id: 3, label: "Twitter", value: "Twitter" },
		{ id: 4, label: "office", value: "office" },
		{ id: 5, label: "other", value: "other" },
	];

	const dateTypes = [
		{ id: 1, label: "birthday", value: "birthday" },
		{ id: 2, label: "anniversary", value: "anniversary" },
		{ id: 3, label: "other", value: "other" },
	];

	function onBarcodeScanned(data) {
		handleScanner();
		const parsedData = JSON.parse(data.data);
		setFirstName(parsedData.first_name);
		setLastName(parsedData.last_name);
		setColor(parsedData.color);
		setAlias(parsedData.alias);
		setCompany(parsedData.company);
		setAddress(parsedData.address);
		const newPhones = [];
		parsedData.phones.forEach((phone) => {
			newPhones.push({
				id: phone.id,
				type: phoneTypes.find((type) => type.id === phone.phone_type).value,
				phoneNumber: phone.phone_number,
				phoneCode: phone.phone_code.toString(),
			});
		});
		setPhoneNumbers(newPhones);
		const newEmails = [];
		parsedData.emails.forEach((email) => {
			newEmails.push({
				id: email.id,
				typeLabel: emailTypes.find((type) => type.id === email.email_type).value,
				email: email.email_direction,
			});
		});
		setEmails(newEmails);
		const newUrls = [];
		parsedData.urls.forEach((url) => {
			newUrls.push({
				id: url.id,
				typeLabel: urlTypes.find((type) => type.id === url.type).value,
				url: url.url,
			});
		});
		setURLs(newUrls);
		const newDates = [];
		parsedData.dates.forEach((date) => {
			newDates.push({
				id: date.id,
				typeLabel: dateTypes.find((type) => type.id === date.date_type).value,
				date: new Date(date.contact_date),
			});
			console.log(dateTypes.find((type) => type.id === date.date_type).value);
		});
		console.log(parsedData.dates);
		setDates(newDates);
		openModal();
	}

	const addContact = () => {
		let newDates = [];
		dates.forEach((date, index) => {
			newDates.push({ ...date, date: `${date.date.getDate()}-${date.date.getMonth() + 1}-${date.date.getFullYear()}` });
		});
		if (!firstName || !phoneNumbers[0] || phoneNumbers[0].phoneNumber === "" || phoneNumbers[0].phoneCode === "") {
			console.log("First name and phone number are required");
			return;
		}

		fetch(`${API_URL}:${API_PORT}/createContact`, {
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

	function handleScanner() {
		setOpenScanner(!openScanner);
	}

	function openModal() {
		setModalVisible(true);
	}

	function closeModal() {
		setModalVisible(false);
	}

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
			{openScanner ? (
				<>
					{permission ? (
						<>
							{permission.granted ? (
								<>
									<View style={styles.backButton}>
										<NewTextButton buttonText="Back" onPress={handleScanner} />
									</View>
									<Text style={styles.text}>Scan QR Code</Text>
									<CameraView
										style={styles.camera}
										facing={facing}
										barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
										onBarcodeScanned={onBarcodeScanned}
									></CameraView>
									<Image source={require("../../../../assets/images/CameraBorders.png")} style={styles.qrCode} />
								</>
							) : (
								<>
									<View style={styles.container}>
										<Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
										<Button onPress={requestPermission} title="grant permission" />
									</View>
								</>
							)}
						</>
					) : (
						<View />
					)}
				</>
			) : (
				<>
					<Text style={styles.title}>Scanner</Text>

					<ControlButton source={require("../../../../assets/images/Scanner.png")} size={50} style={styles.add} onPress={handleScanner} />

					<View style={styles.yourQR}>
						<View style={{ ...styles.icon, backgroundColor: colors[yourColor - 1] }}>
							<Text style={{ color: "white", fontSize: 30 }}>{firstLetter}</Text>
						</View>
						<Text style={styles.nameText}>{yourName || `Contact`}</Text>
						<View style={styles.qrCodePosition}>
							<QRCode value={qrValue} size={200} color="black" backgroundColor="white" />
						</View>
					</View>
				</>
			)}
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
							<Carousel letter={firstName ? firstName[0].toUpperCase() : "?"} setIndex={setColor} defaultColor={colorMapping[color]} />
						</View>
						<FlatList
							style={styles.list}
							ListHeaderComponent={
								<>
									<GrayInput placeholder="First name" style={styles.input} defaultValue={firstName} onChangeText={setFirstName} />
									<GrayInput placeholder="Last name" style={styles.input} defaultValue={lastName} onChangeText={setLastName} />
									<GrayInput placeholder="Alias" style={styles.input} defaultValue={alias} onChangeText={setAlias} />
									<GrayInput placeholder="Company" style={styles.input} defaultValue={company} onChangeText={setCompany} />
									<GrayInput
										placeholder="Address"
										style={[styles.input, styles.lastInput]}
										defaultValue={address}
										onChangeText={setAddress}
									/>
								</>
							}
							ListFooterComponent={
								<>
									<Text style={styles.sectionTitle}>Phone Numbers</Text>
									{phoneNumbers.map((phone_number, index) => (
										<PhoneInput
											key={index}
											phone={phone_number}
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

export default Scanner;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#030B38",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		marginTop: 20,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 75,
		width: 75,
		borderRadius: 100,
	},
	qrCodePosition: {
		paddingTop: 20,
	},
	title: {
		position: "absolute",
		left: 23,
		top: 49,
		fontFamily: "BROmnySemiBold",
		fontSize: 33,
		color: "#fff",
	},
	camera: {
		position: "absolute",
		width: "75%",
		height: containerWidth,
	},
	qrCode: {
		position: "absolute",
		width: "65%",
		height: otherWidth,
	},
	backButton: {
		position: "absolute",
		top: 20,
		left: 20,
	},
	yourQR: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: "75%",
		paddingBottom: 40,
		borderRadius: 10,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	nameText: {
		fontSize: 24,
		fontWeight: "BROmnyRegular",
		color: "black",
		paddingTop: 10,
		paddingBottom: 15,
	},
	text: {
		position: "absolute",
		top: 100,
		fontSize: 24,
		fontWeight: "BROmnyRegular",
		color: "#8C91B4",
		paddingBottom: 20,
	},
	add: {
		position: "absolute",
		top: 50,
		right: 30,
	},
	input: {
		marginBottom: 12,
	},
	lastInput: {
		marginBottom: 0,
	},
	list: {
		marginTop: 20,
		height: 366,
	},
});
