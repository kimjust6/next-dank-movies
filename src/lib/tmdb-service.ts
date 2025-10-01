import { TMDB_BASE_URL } from '@/lib/constants'
import { Movie, TMDBResponse, TVShow } from '@/lib/types'

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

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

// Get top rated movies
export const getTopRatedMovies = async (page: number = 1) => {
    return get<TMDBResponse<Movie>>('/movie/top_rated', {
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

// TV Shows

// Get popular TV shows
export const getPopularTV = async (page: number = 1) => {
    return get<TMDBResponse<TVShow>>('/tv/popular', {
        language: 'en-US',
        page,
    })
}

// Get top rated TV shows
export const getTopRatedTV = async (page: number = 1) => {
    return get<TMDBResponse<TVShow>>('/tv/top_rated', {
        language: 'en-US',
        page,
    })
}

// Get TV show details
export const getTVDetails = async (id: number) => {
    return get<TVShow>(`/tv/${id}`, { language: 'en-US' })
}

// Search TV shows
export const searchTV = async (query: string, page: number = 1) => {
    return get<TMDBResponse<TVShow>>('/search/tv', {
        query,
        language: 'en-US',
        page,
    })
}
