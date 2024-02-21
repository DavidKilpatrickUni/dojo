import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { Navigate, useNavigate } from "react-router-dom";


import './Create.css'

export default function Create() {

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    const { user: currentUser } = useAuthContext()

    const { addDocument, response } = useFirestore('projects')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()


        setFormError(null)

        if (!category) {
            setFormError('Please select a project category')
            return
        }

        if (assignedUsers.length < 1) {
            setFormError('Please select assigned user(s)')
            return
        }


        console.log(currentUser)

        const createdBy = {
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            id: currentUser.uid
        }


        const assignedUsersList = assignedUsers.map((user) => {
            return {
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id
            }
        })

        const project = {
            name: name,
            details: details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy: createdBy,
            assignedUsersList: assignedUsersList
        }

        // console.log('create :', name, details, dueDate, category.value, assignedUsers ,createdBy, assignedUsersList)

        console.log('create :', project)



        await addDocument(project)

        if (!response.error) {
            navigate('/')
        }

    }

    const categories = [
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' }
    ]

    const { documents } = useCollection('users')
    const [users, setUser] = useState([])

    useEffect(() => {
        if (documents) {
            const options = documents.map((document) => {
                return { value: document, label: document.displayName }
            })

            setUser(options)
        }
    }, [documents])


    return (

        < div className='create-form' onSubmit={handleSubmit} >
            <h2 className='page-title'>Create A New Project</h2>
            <form>
                <label>
                    <span>Project Name:</span>
                    <input
                        type='text'
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        type='text'
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>Project Due Date:</span>
                    <input
                        type='date'
                        required
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project Category</span>
                    <Select
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assign To:</span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
                <button className='btn'>Add Project</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div >
    )
}
