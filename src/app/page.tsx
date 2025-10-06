'use client'

import { Button } from '@/components/ui/button'
import { addFilmToPocketBase } from '@/lib/pocketbase-service'
import { getMovieDetails } from '@/lib/tmdb-service'
import { useState } from 'react'

export default function Home() {
    const [film, setFilm] = useState<string>()
    function dankMeme() {
        getMovieDetails(27205).then((response) => {
            setFilm(JSON.stringify(response))
            addFilmToPocketBase(response)
        })
    }

    return (
        <main className="typography">
            {film}
            <Button onClick={dankMeme} variant="secondary">
                Button
            </Button>
        </main>
    )
}
