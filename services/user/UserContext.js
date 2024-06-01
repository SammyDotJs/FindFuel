import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
    const [userDetails, setUserDetails] = useState([{}])

    const setDetails = (data) => {
        setUserDetails(data)
    }


    return (
        <UserContext.Provider value={
            {
                userDetails,
                setDetails: setDetails
            }
        }>
            {children}
        </UserContext.Provider>
    )
}