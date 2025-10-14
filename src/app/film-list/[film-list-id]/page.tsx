import { FilmList } from '@/components/FilmList'
import { getFilmListById, getFilmsByListId } from '@/lib/pocketbase-service'

type FilmListPageProps = {
    params: {
        'film-list-id': string
    }
}

export default async function FilmListPage({ params }: FilmListPageProps) {
    const paramsValue = await params
    const filmListId = paramsValue['film-list-id']
    const filmList = await getFilmListById(filmListId)
    const films = await getFilmsByListId(filmListId)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">{filmList.title}</h1>
            <FilmList films={films} />
        </div>
    )
}
