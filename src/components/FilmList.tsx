import { FilmsResponse } from '@/lib/pocketbase-types'
import { MovieCard } from './MovieCard'
import { FilmTable } from './FilmTable'

type FilmListProps = {
    films: FilmsResponse[]
}

export function FilmList({ films }: FilmListProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:hidden sm:grid-cols-2">
                {films.map((film) => (
                    <MovieCard key={film.id} film={film} />
                ))}
            </div>

            <div className="hidden w-full sm:block">
                <FilmTable films={films} />
            </div>
        </>
    )
}
