import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import { useEffect, useState } from 'react'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Dashboard() {

    const { documents: projects, error } = useCollection('projects')

    const [currentFilter, setCurrentFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const { user } = useAuthContext()

    const filteredProjects = projects ? projects.filter((project) => {
        switch (currentFilter) {
            case 'all':
                return true;
            case 'mine':
                let assignedToMe = false
                project.assignedUsersList.forEach((assignedUser) => {
                    if (user.uid === assignedUser.id) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
                return project.category === 'development'
            case 'design':
                return project.category === 'design'
            case 'sales':
                return project.category === 'sales'
            case 'marketing':
                return project.category === 'marketing'

            default:
                return true

        }
    }) : null

    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {projects && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
            {projects && <ProjectList projects={filteredProjects} />}
        </div>
    )
}
