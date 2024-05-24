import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

import StartScreen from "./src/apps/security/StartScreen";
import SignIn from "./src/apps/security/SignIn";
import SignUp from "./src/apps/security/SignUp";
import MainTab from "./src/apps/home/MainTab";

const Stack = createStackNavigator();

function App() {
    // const [fontsLoaded] = useFonts({
    //     BROmnyRegular: require("./assets/fonts/BROmny-Regular.otf"),
    //     BROmnyMedium: require("./assets/fonts/BROmny-Medium.otf"),
    //     BROmnySemiBold: require("./assets/fonts/BROmny-SemiBold.otf"),
    // });

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="StartScreen">
                <Stack.Screen
                    name="StartScreen"
                    component={StartScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MainTab"
                    component={MainTab}
                    options={{ headerShown: false }} // gestureEnabled: false
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
