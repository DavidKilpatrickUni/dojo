import { useState, useEffect } from "react"
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { useLocation } from 'react-router-dom'

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)
    const [url, setUrl] = useState(useLocation().pathname)


    useEffect(() => {
        if (url !== '/signup') {
            return () => setIsCancelled(true)
        }
    }, [url])

    const { dispatch } = useAuthContext()


    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)


        try {
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(response.user)

            if (!response) {
                throw new Error('Could not complete signup')
            }

            const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgURL = await img.ref.getDownloadURL()

            await response.user.updateProfile({ displayName: displayName, photoURL: imgURL })

            // create entry in normal database with specific uid

            await projectFirestore.collection('users').doc(response.user.uid).set({
                online: true,
                displayName: displayName,
                photoURL: imgURL
            })

            // dispatch login

            dispatch({ type: 'LOGIN', payload: response.user })

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

    // useEffect(() => {
    //     return () => setIsCancelled(true)
    // }, [])



    return { error, isPending, signup }
}