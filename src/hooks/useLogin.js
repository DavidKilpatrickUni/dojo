import { useState, useEffect, useCallback } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { useLocation } from 'react-router-dom'

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)
    const [url, setUrl] = useState(useLocation().pathname)

    useEffect(() => {
        if (url !== '/login') {
            return () => setIsCancelled(true)
        }
    }, [url])

    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const response = await projectAuth.signInWithEmailAndPassword(email, password)

            const { uid } = response.user
            await projectFirestore.collection('users').doc(uid).update({ online: true })

            dispatch({ type: 'LOGIN', payload: response.user }) //no payload as setting user to null anyway

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }

            // change online status of current user



        } catch (err) {

            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }

    }



    return { login, error, isPending }
}

