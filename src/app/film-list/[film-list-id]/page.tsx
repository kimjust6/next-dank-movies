'use client'

import { FilmTable } from '@/components/FilmTable'
import { MovieCard } from '@/components/MovieCard'
import { useIsMobile } from '@/hooks/use-mobile'
import { getFilmListById, getFilmsByListId } from '@/lib/pocketbase-service'
import type { FilmListsResponse, FilmsResponse } from '@/lib/pocketbase-types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function FilmListPage() {
    const params = useParams()
    const filmListId = params['film-list-id'] as string
    const isMobile = useIsMobile()
    const [filmList, setFilmList] = useState<FilmListsResponse>()
    const [films, setFilms] = useState<FilmsResponse[]>([])

    useEffect(() => {
        if (filmListId) {
            let isCancelled = false

            const fetchFilmList = async () => {
                try {
                    const list = await getFilmListById(filmListId)
                    if (!isCancelled) {
                        setFilmList(list)
                    }
                } catch (error) {
                    if (error instanceof Error && error.name !== 'AbortError') {
                        console.error('Failed to fetch film list:', error)
                    }
                }
            }

            const fetchFilms = async () => {
                try {
                    const filmItems = await getFilmsByListId(filmListId)
                    if (!isCancelled) {
                        setFilms(filmItems)
                    }
                } catch (error) {
                    if (error instanceof Error && error.name !== 'AbortError') {
                        console.error('Failed to fetch films:', error)
                    }
                }
            }

            fetchFilmList()
            fetchFilms()

            return () => {
                isCancelled = true
            }
        }
    }, [filmListId])

    if (!filmList) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">{filmList.title}</h1>
            {isMobile ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {films.map((film) => (
                        <MovieCard key={film.id} film={film} />
                    ))}
                </div>
            ) : (
                <FilmTable films={films} />
            )}
        </div>
    )
}
