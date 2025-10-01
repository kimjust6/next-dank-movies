export interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string
    release_date: string
}

export interface TVShow {
    id: number
    name: string
    overview: string
    poster_path: string
    first_air_date: string
}

export interface TMDBResponse<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}
