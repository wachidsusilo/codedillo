import { useEffect, useRef } from 'react'
import usePagination from '../../hooks/UsePagination'
import { useRouter } from 'next/router'
import useFilter from '../../hooks/UseFilter'
import { getColor } from '../../utils/color'
import { ProjectMeta } from '../../typings'
import ProjectCard from './ProjectCard'
import Pagination from '../general/Pagination'

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
    {...project, id: '2'},
    {...project, id: '3'},
    {...project, id: '4'},
    {...project, id: '5'},
    {...project, id: '6'},
    {...project, id: '7'},
    {...project, id: '8'},
    {...project, id: '9'},
    {...project, id: '10'}
]

const ProjectList = ({className}: Props) => {
    const projectAnchorRef = useRef<HTMLDivElement>(null)
    const lastPageRef = useRef(1)
    const {selected} = usePagination()
    const {query: {page}} = useRouter()
    const {filters, setFilters, setSelectedFilters, isFilterSelected, toggleFilter} = useFilter()

    useEffect(() => {
        setFilters([
            {id: '1', name: 'Android', color: 'green'},
            {id: '2', name: 'Arduino', color: 'blue'},
            {id: '3', name: 'Web', color: 'yellow'}
        ])
        setSelectedFilters([
            {id: '1', name: 'Android', color: 'green'},
            {id: '2', name: 'Arduino', color: 'blue'},
            {id: '3', name: 'Web', color: 'yellow'}
        ])
    }, [])

    useEffect(() => {
        if (page && typeof page === 'string' && !isNaN(parseInt(page)) && isFinite(parseInt(page))) {
            const p = parseInt(page)
            if (p !== lastPageRef.current) {
                lastPageRef.current = p
                projectAnchorRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                })
            }
        }
    }, [selected, page])


    return (
        <section ref={projectAnchorRef} className={`w-full flex ${className}`}>
            <div className="w-full max-w-container-lg mx-auto px-8 flex flex-col">
                <div>
                    <h2 className="text-xl font-medium">Projects</h2>
                    <p className="mt-2 text-md text-white/40">Discover our top projects</p>
                </div>
                <div className="w-full mt-4 flex items-center gap-2">
                    <span className="text-md text-white/40 mr-2">Tags:</span>
                    <div className="w-full flex flex-wrap gap-2">
                        {
                            filters.map((value) => (
                                <button
                                    key={value.id}
                                    className="px-4 py-2 flex items-center rounded-full text-sm transition"
                                    style={{
                                        color: isFilterSelected(value) ? getColor(value.color, 0.9) : 'rgba(255,255,255,0.6)',
                                        backgroundColor: isFilterSelected(value) ? getColor(value.color, 0.1) : 'rgba(255,255,255,0.05)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = isFilterSelected(value) ? getColor(value.color, 1) : 'rgba(255,255,255,0.8)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = isFilterSelected(value) ? getColor(value.color, 0.9) : 'rgba(255,255,255,0.6)'
                                    }}
                                    onClick={() => toggleFilter(value)}>
                                    {value.name}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {
                        projectList.map((meta) => (
                            <ProjectCard key={meta.id} content={meta} />
                        ))
                    }
                </div>
                <Pagination className="mt-16"/>
            </div>
        </section>
    )
}

export default ProjectList