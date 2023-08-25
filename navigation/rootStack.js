import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../screens/OnBoarding";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ResetP from "../screens/ResetP";
import NewPassword from "../screens/NewPassword";
import UserPin from "../screens/UserPin";
import OTPVerification from "../screens/OTPVerification";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

    const { previouslyLoggedIn } = useContext(UserContext)

    useEffect(() => {
        console.log('previouslyloggedIN', previouslyLoggedIn)
    }, [])
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={previouslyLoggedIn ? "Login" : "OnBoarding"}>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ResetP" component={ResetP} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="UserPin" component={UserPin} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} />
        </Stack.Navigator>
    )
}

// initialRouteName={previouslyLoggedIn ? "login" : "OnBoarding"}