import { FilmListCard } from '@/components/FilmListCard'
import { getAllFilmLists } from '@/lib/pocketbase-service'

export default async function BrowsePage() {
    const filmLists = await getAllFilmLists()
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Browse Film Lists</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filmLists.map((filmList) => (
                    <FilmListCard key={filmList.id} filmList={filmList} />
                ))}
            </div>
        </div>
    )
}
