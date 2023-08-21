import { NavigationContainer } from "@react-navigation/native"
import RootNavigator from "./rootStack"
import UserNavigator from "./userStack"
import useAuth from "../hook/useAuth"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"


export default function Navigation() {
    const {userLoggedIn} = useContext(UserContext)
    return (
        <NavigationContainer>
         {<UserNavigator /> }
        </NavigationContainer>
    )
}

// {userLoggedIn? <UserNavigator /> : <RootNavigator />}


