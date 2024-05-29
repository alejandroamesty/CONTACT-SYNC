import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import StartScreen from "./src/apps/security/StartScreen";
import SignIn from "./src/apps/security/SignIn";
import SignUp from "./src/apps/security/SignUp";
import MainTab from "./src/apps/home/MainTab";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
	return Font.loadAsync({
		BROmnyRegular: require("./assets/fonts/BROmny-Regular.otf"),
		BROmnyMedium: require("./assets/fonts/BROmny-Medium.otf"),
		BROmnySemiBold: require("./assets/fonts/BROmny-SemiBold.otf"),
	});
};

function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		fetchFonts().then(() => {
			setFontsLoaded(true);
			SplashScreen.hideAsync();
		});
	}, []);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<StatusBar barStyle="light-content" backgroundColor="#ffffff" />
			<Stack.Navigator initialRouteName="StartScreen">
				<Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
				<Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
				<Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
				<Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false, gestureEnabled: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
