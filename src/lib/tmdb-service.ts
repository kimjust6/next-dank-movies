import { TMDB_BASE_URL } from '@/lib/constants'
import { Movie, TMDBResponse } from '@/lib/types'

const TMDB_API_KEY = process.env.TMDB_API_KEY

if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not set in environment variables')
}

// Generic GET function
export async function get<T>(
    endpoint: string,
    params: Record<string, string | number> = {}
): Promise<T> {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`)

    // add api_key and other query params
    url.searchParams.set('api_key', TMDB_API_KEY!)
    Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, String(value))
    )

    const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // (optional if in Next.js for caching)
    })

    if (!res.ok) {
        throw new Error(`TMDB API error: ${res.status} ${res.statusText}`)
    }

    return res.json() as Promise<T>
}

// Get popular movies
export const getPopularMovies = async (page: number = 1) => {
    return get<TMDBResponse<Movie>>('/movie/popular', {
        language: 'en-US',
        page,
    })
}

// Search movies
export const searchMovies = async (query: string, page: number = 1) => {
    return get<TMDBResponse<Movie>>('/search/movie', {
        query,
        language: 'en-US',
        page,
    })
}

// Get movie details
export const getMovieDetails = async (id: number) => {
    return get<Movie>(`/movie/${id}`, { language: 'en-US' })
}
