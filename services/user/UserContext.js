import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
    const [userDetails, setUserDetails] = useState([{}])
    const [loggedInDetails, setLoggedInDetails] = useState([{}])

    const setDetails = (data) => {
        setUserDetails(data)
    }
    const setLoggedDetails=(data)=>{
        setLoggedInDetails(data)
    }

    console.log("UD", userDetails);


    return (
        <UserContext.Provider value={
            {
                userDetails,
                setDetails: setDetails,
                setLoggedDetails:setLoggedDetails,
                loggedInDetails
            }
        }>
            {children}
        </UserContext.Provider>
    )
}