import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Trips from "../screens/Trips";
import Settings from "../screens/Settings";
import EditProfile from "../screens/EditProfile";
import Payment from "../screens/Payment";
import CreditCard from "../screens/CreditCard";
import Momo from "../screens/Momo";
import VodaCash from "../screens/VodaCash";
import Location from "../screens/Location";
import TruckSelection from "../screens/TruckSelection";


const Stack = createNativeStackNavigator();

export default function UserNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TruckSelection">
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="Trips" component={Trips} />

            <Stack.Screen
                name="Settings"
                component={Settings}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Momo" component={Momo} />
            <Stack.Screen name="VodaCash" component={VodaCash} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="TruckSelection" component={TruckSelection} />
            <Stack.Screen name="CreditCard" component={CreditCard} />
        </Stack.Navigator>
    )
}