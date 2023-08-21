import React from 'react'
import { useState } from "react";
import useAuth from '../hook/useAuth';
import useUser from '../hook/useUser';
import { UserContext } from "../contexts/UserContext"

export const UserProvider = ({children})=> {

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [previouslyLoggedIn, setPreviouslyLoggedIn] = useState(false);
    const [isUserDataLoading, setIsUserDataLoading] = useState(false);
    const [userData, setUserData] = useState("");
    return (
        <UserContext.Provider 
        value={{
            userLoggedIn, 
            setUserLoggedIn,
            previouslyLoggedIn,
            setPreviouslyLoggedIn,
            }}>
            {children}
        </UserContext.Provider>
    )
}