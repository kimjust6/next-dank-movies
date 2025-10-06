'use client'

import { Button } from '@/components/ui/button'
import { addFilmToPocketBase } from '@/lib/pocketbase-service'
import { getMovieDetails, searchMovies } from '@/lib/tmdb-service'
import { useEffect, useState } from 'react'

export default function Home() {
    const [film, setFilm] = useState<string>()
    function dankMeme() {
        // searchMovies('Inception').then((response) => {
        //     setFilm(JSON.stringify(response))
        // })
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
