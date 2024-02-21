import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'

import './Project.css'
import ProjectComments from './ProjectComments'

export default function Project() {

    const { id } = useParams()
    const { error, document: project } = useDocument('projects', id)

    if (error) {
        return <div className='error'>{error}</div>
    }

    if (!project) {
        return <div className='loading'>Loading...</div>
    }

    return (
        <div className='project-details'>
            <ProjectSummary project={project} />
            <ProjectComments project={project} />
        </div>
    )
}
