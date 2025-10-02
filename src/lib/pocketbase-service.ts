import type {
    FilmsRecord,
    FilmsResponse,
    IsoDateString,
} from '@/lib/pocketbase-types'
import PocketBase from 'pocketbase'
import { TMDB_FILMS_COLLECTION } from '@/lib/constants'
import { Movie, MovieDetail } from '@/lib/types'

const POCKET_BASE_URL = process.env.NEXT_PUBLIC_POCKET_BASE_URL

if (!POCKET_BASE_URL) {
    throw new Error('Missing POCKET_BASE_URL environment variable')
}

export const pb = new PocketBase(POCKET_BASE_URL)

export async function getAllFilms(): Promise<FilmsResponse[]> {
    return await pb
        .collection(TMDB_FILMS_COLLECTION)
        .getFullList<FilmsResponse>()
}

export async function getFilmById(id: string): Promise<FilmsResponse> {
    return await pb.collection(TMDB_FILMS_COLLECTION).getOne<FilmsResponse>(id)
}

export async function createFilm(data: FilmsRecord): Promise<FilmsResponse> {
    return await pb
        .collection(TMDB_FILMS_COLLECTION)
        .create<FilmsResponse>(data)
}

export async function updateFilm(
    id: string,
    data: Partial<FilmsRecord>
): Promise<FilmsResponse> {
    return await pb
        .collection(TMDB_FILMS_COLLECTION)
        .update<FilmsResponse>(id, data)
}

export async function deleteFilm(id: string): Promise<void> {
    await pb.collection(TMDB_FILMS_COLLECTION).delete(id)
}

export async function getFilmsPaginated(
    page: number = 1,
    perPage: number = 10
) {
    return await pb.collection(TMDB_FILMS_COLLECTION).getList(page, perPage)
    // returns: { items, page, perPage, totalItems, totalPages }
}

export function convertTmdbFilmToPocketFilm(
    data: MovieDetail,
    id: string = crypto.randomUUID(),
    filmList: string = '',
    suggestedBy: string = '',
    tomatoMeter: number = -1,
    updated: IsoDateString = new Date().toISOString(),
    watched: IsoDateString = new Date().toISOString()
): FilmsRecord {
    const record: FilmsRecord = {
        filmList,
        suggestedBy,
        tomatoMeter,
        id,
        updated,
        watched,
        backdrop: data.backdrop_path,
        genreIds: data.genre_ids.join(';'),
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        poster: data.poster_path,
        releaseDate: data.release_date,
        runtime: data.runtime ?? -1,
        title: data.title,
        tmdbId: JSON.stringify(data.id),
        tmdbScore: data.vote_average,
        tmdbVoteCount: data.vote_count,
    }

    return record
}
