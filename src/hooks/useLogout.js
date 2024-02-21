import { useState, useEffect } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { useLocation } from 'react-router-dom'

export const useLogout = () => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    // const [url, setUrl] = useState(useLocation().pathname)


    // useEffect(() => {
    //     if (url !== '/logout') {
    //         return () => setIsCancelled(true)
    //     }
    // }, [url])

    const { dispatch, user } = useAuthContext()


    const logout = async () => {
        setError(null)
        setIsPending(true)


        try {
            // change online status of current user

            const { uid } = user
            await projectFirestore.collection('users').doc(uid).update({ online: false })

            await projectAuth.signOut()

            dispatch({ type: 'LOGOUT' }) //no payload as setting user to null anyway

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }

        } catch (err) {

            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}
