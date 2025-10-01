'use client'

import { Button } from '@/components/ui/button'
import { searchMovies } from '@/lib/tmdb-service'
import { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        searchMovies('Inception').then((response) => {
            console.log('Search Results:', response)
        })
    }, [])

    return (
        <main>
            HomePage
            <Button variant="secondary">Button</Button>
        </main>
    )
}
