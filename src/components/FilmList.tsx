'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { FilmsResponse } from '@/lib/pocketbase-types'
import { MovieCard } from './MovieCard'
import { FilmTable } from './FilmTable'

type FilmListProps = {
    films: FilmsResponse[]
}

export function FilmList({ films }: FilmListProps) {
    const isMobile = useIsMobile()

    return isMobile ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {films.map((film) => (
                <MovieCard key={film.id} film={film} />
            ))}
        </div>
    ) : (
        <FilmTable films={films} />
    )
}
