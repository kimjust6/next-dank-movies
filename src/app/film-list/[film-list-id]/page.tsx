import { MovieCard } from '@/components/MovieCard'
import { getFilmListById, getFilmsByListId } from '@/lib/pocketbase-service'

interface FilmListPageProps {
    params: {
        'film-list-id': string
    }
}

export default async function FilmListPage({ params }: FilmListPageProps) {
    const filmListId = params['film-list-id']
    const filmList = await getFilmListById(filmListId)
    const films = await getFilmsByListId(filmListId)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">{filmList.title}</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {films.map((film) => (
                    <MovieCard key={film.id} film={film} />
                ))}
            </div>
        </div>
    )
}
