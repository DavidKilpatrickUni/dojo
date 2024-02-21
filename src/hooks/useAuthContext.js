import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)


    if (!context) { //compontent must be wrapped inside AuthContext.Provider
        throw Error('useAuthContext must be use inside a AuthContextProvider')
    }

    return context
}