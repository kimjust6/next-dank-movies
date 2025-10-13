import { MovieCard } from '@/components/MovieCard'
import { searchMovies } from '@/lib/tmdb-service'
import { Movie, TMDBResponse } from '@/lib/types'

type SearchPageProps = {
    searchParams: {
        q?: string
    }
}

async function SearchPage({ searchParams }: SearchPageProps) {
    const searchTerm = searchParams.q
    let movies: TMDBResponse<Movie> | null = null

    if (searchTerm) {
        movies = await searchMovies(searchTerm)
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold">Search Results</h1>
                {movies && searchTerm && (
                    <p className="text-muted-foreground">
                        Found {movies.total_results} results for &quot;
                        {searchTerm}&quot;
                    </p>
                )}
            </div>

            {movies && movies.results.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {movies.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground text-lg">
                        {searchTerm
                            ? 'No movies found for your search.'
                            : 'Please enter a search term to find movies.'}
                    </p>
                </div>
            )}
        </main>
    )
}

export default SearchPage
