import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Trips from "../screens/Trips";
import Settings from "../screens/Settings";
import EditProfile from "../screens/EditProfile";
import Payment from "../screens/Payment";
import CreditCard from "../screens/CreditCard";
import Momo from "../screens/Momo";
import WaitingForDriver from "../screens/WaitingForDriver";
import LocationsPage from "../screens/LocationsPage";
import TruckSelection from "../screens/TruckSelection";


const Stack = createNativeStackNavigator();

export default function UserNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="Trips" component={Trips} />

            <Stack.Screen
                name="Settings"
                component={Settings}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="WaitingForDriver" component={WaitingForDriver} />
            <Stack.Screen name="LocationsPage" component={LocationsPage} />
            <Stack.Screen name="TruckSelection" component={TruckSelection} />
            <Stack.Screen name="CreditCard" component={CreditCard} />
        </Stack.Navigator>
    )
}