export interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
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

export interface Genre {
    id: number
    name: string
}

export interface ProductionCompany {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    iso_639_1: string
    name: string
    english_name: string
}

export interface MovieDetail extends Movie {
    belongs_to_collection: null | {
        id: number
        name: string
        poster_path: string | null
        backdrop_path: string | null
    }
    budget: number
    genres: Genre[]
    homepage: string | null
    imdb_id: string | null
    origin_country: string[]
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    revenue: number
    runtime: number | null
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
}
