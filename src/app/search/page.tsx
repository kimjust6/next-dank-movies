import { searchMovies } from '@/lib/tmdb-service'
import { Movie, TMDBResponse } from '@/lib/types'
import { MovieCard } from '@/components/MovieCard'

async function page() {
    const movies: TMDBResponse<Movie> = await searchMovies('batman')
    
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Search Results</h1>
                <p className="text-muted-foreground">
                    Found {movies.total_results} movies
                </p>
            </div>
            
            {movies.results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                        No movies found. Try a different search.
                    </p>
                </div>
            )}
        </main>
    )
}

export default page
