import type { FilmsRecord, FilmsResponse } from '@/lib/pocketbase-types'
import PocketBase from 'pocketbase'
import { TMDB_FILMS_COLLECTION } from '@/lib/constants'

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
