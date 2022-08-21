import { ProjectMeta } from '../../typings'
import ProjectCard from './ProjectCard'

interface Props {
    className: string
}

const project: ProjectMeta = {
    id: '1',
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at deleniti iusto velit. Eligendi illum modi numquam repudiandae sequi! Quaerat?',
    imageUrls: [
        '/assets/images/sample_programming.jpg',
        '/assets/images/sample_programming.jpg',
        '/assets/images/sample_programming.jpg',
        '/assets/images/sample_programming.jpg',
        '/assets/images/sample_programming.jpg'
    ],
    languages: ['ts', 'kt', 'cpp'],
    frameworks: ['arduino', 'android', 'next', 'react']
}

const projectList: Array<ProjectMeta> = [
    {...project, id: '1'},
    {...project, id: '2'}
]

const ProjectFeatured = ({className}: Props) => {

    return (
        <section className={`w-full max-w-container-lg mx-auto px-8 flex flex-col gap-8 ${className}`}>
            <div className="w-full">
                <h2 className="text-xl font-medium">Featured</h2>
                <p className="mt-2 text-md text-white/40">Our top projects to get you started</p>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-8">
                {
                    projectList.map((meta) => (
                        <ProjectCard key={meta.id} content={meta} />
                    ))
                }
            </div>
        </section>
    )
}

export default ProjectFeatured