import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

import './Signup.css'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const { signup, isPending, error } = useSignup()


    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)

        if (!selected) {
            setThumbnailError('Please Select A File')
            return
        }

        if (!selected.type.includes('image')) {
            setThumbnailError('Please Select A Image Type File')
            return
        }

        if (selected.size > 100000) {
            setThumbnailError('Please Select A Smaller File Size. Limit 100KB')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, displayName, thumbnail)
        signup(email, password, displayName, thumbnail)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>
                <span>
                    Email:
                </span>
                <input
                    type='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>
                    Password:
                </span>
                <input
                    type='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>
                    Display Name:
                </span>
                <input
                    type='text'
                    required
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>
                    Profile Thumbnail:
                </span>
                <input
                    type='file'
                    required
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
            </label>
            {!isPending ? <button className='btn'>Signup</button> : <button className='btn' disabled >Loading...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
