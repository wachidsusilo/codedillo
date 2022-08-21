import { Color } from '../utils/color'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

export interface Filter {
    id: string
    name: string
    color: Color
}

interface IFilter {
    filters: Array<Filter>
    setFilters: Dispatch<SetStateAction<Array<Filter>>>
    selectedFilters: Array<Filter>
    setSelectedFilters: Dispatch<SetStateAction<Array<Filter>>>
    isFilterSelected: (filter: Filter) => boolean
    toggleFilter: (filter: Filter) => void
}

const FilterContext = createContext<IFilter>({
    filters: [],
    setFilters: () => {},
    selectedFilters: [],
    setSelectedFilters: () => {},
    isFilterSelected: () => false,
    toggleFilter: () => {}
})

interface FilterProviderProps {
    children: ReactNode
}

export const FilterProvider = ({children}: FilterProviderProps) => {
    const [filters, setFilters] = useState<Array<Filter>>([])
    const [selectedFilters, setSelectedFilters] = useState<Array<Filter>>([])

    return (
        <FilterContext.Provider value={{
            filters,
            setFilters,
            selectedFilters,
            setSelectedFilters,
            isFilterSelected: (filter) => selectedFilters.some(it => it.id === filter.id),
            toggleFilter: (filter: Filter) => {
                if (selectedFilters.some(it => it.id === filter.id)) {
                    setSelectedFilters(selectedFilters.filter(it => it.id !== filter.id))
                } else {
                    setSelectedFilters([...selectedFilters, filter])
                }
            }
        }}>
            {children}
        </FilterContext.Provider>
    )
}

export default function useFilter() {
    return useContext(FilterContext)
}