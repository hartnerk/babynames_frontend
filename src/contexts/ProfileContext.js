import { createContext, useState } from "react"



export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {

    const [user, setUser] = useState()
    const [coupleId, setCoupleId] = useState()

    return (
        <ProfileContext.Provider value={ {user, setUser, coupleId, setCoupleId} }>
            {children}
        </ProfileContext.Provider>
    )
}