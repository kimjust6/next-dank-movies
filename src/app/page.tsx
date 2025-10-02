'use client'

import { Button } from '@/components/ui/button'
import { searchMovies } from '@/lib/tmdb-service'
import { useEffect, useState } from 'react'

export default function Home() {
    const [film, setFilm] = useState<string>()
    function dankMeme() {
        searchMovies('Inception').then((response) => {
            setFilm(JSON.stringify(response))
        })
    }

    return (
        <main>
            {film}
            <Button onClick={dankMeme} variant="secondary">
                Button
            </Button>
        </main>
    )
}
