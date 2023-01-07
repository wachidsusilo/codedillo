import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface Props {
    className?: string

    onInput?(query: string): void
}

const Search = ({className = '', onInput}: Props) => {
    return (
        <div className={`w-full py-2 flex border-b items-center border-white/20 text-white/80 ${className}`}>
            <MagnifyingGlassIcon className="s-5 shrink-0" />
            <input type="text"
                   className="grow pl-4"
                   placeholder={"Search"}
                   spellCheck='false'
                   onInput={(e) => {
                       if (onInput) {
                           onInput(e.currentTarget.value)
                       }
                   }} />
        </div>
    )
}

export default Search