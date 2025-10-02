import { TMDB_FILMS_COLLECTION } from '@/lib/constants'
import type {
    FilmsRecord,
    FilmsResponse,
    IsoDateString,
} from '@/lib/pocketbase-types'
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdb-service'
import { backdropSize, MovieDetail, posterSize } from '@/lib/types'
import { generateShortUUID } from '@/lib/utils'
import PocketBase from 'pocketbase'

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

export function mapTmdbFilmToPocketFilm(
    data: MovieDetail,
    id: string = generateShortUUID(),
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
        backdropUrl: getBackdropUrl(data.backdrop_path, backdropSize.original),
        genres: data.genres?.map((genre) => genre.name)?.join(';'),
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        posterUrl: getPosterUrl(data.poster_path, posterSize.original),
        releaseDate: data.release_date,
        runtime: data.runtime ?? -1,
        title: data.title,
        tmdbId: JSON.stringify(data.id),
        tmdbScore: data.vote_average,
        tmdbVoteCount: data.vote_count,
    }

    return record
}

export async function addFilmToPocketBase(
    data: MovieDetail
): Promise<FilmsResponse> {
    const record = mapTmdbFilmToPocketFilm(data)
    return await addWatchedFilm(record)
}

async function addWatchedFilm(data: FilmsRecord): Promise<FilmsResponse> {
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
