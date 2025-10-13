'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'

function SearchComponent() {
    const router = useRouter()

    function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            const searchTerm = e.currentTarget.value
            if (searchTerm) {
                router.push(`/search?q=${searchTerm}`)
            }
        }
    }

    return (
        <div className="relative hidden sm:block">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
                placeholder="Search movies..."
                className="bg-secondary/50 border-border/50 w-64 pl-9"
                onKeyDown={handleSearch}
            />
        </div>
    )
}

export default SearchComponent
