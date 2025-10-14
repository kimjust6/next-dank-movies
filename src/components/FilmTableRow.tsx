'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import type { FilmsResponse } from '@/lib/pocketbase-types'
import { getPosterUrl } from '@/lib/tmdb-service'
import { posterSize } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface FilmTableRowProps {
    film: FilmsResponse
}

export function FilmTableRow({ film }: FilmTableRowProps) {
    return (
        <TableRow>
            <TableCell>
                <Image
                    src={getPosterUrl(film.poster, posterSize.w154)}
                    alt={film.title}
                    width={100}
                    height={150}
                    className="rounded-md"
                    priority
                />
            </TableCell>
            <TableCell>
                <Link
                    href={`/movie/${film.tmdbId}`}
                >{`${film.title} [${new Date(film.releaseDate).getFullYear()}]`}</Link>
            </TableCell>

            <TableCell>
                {typeof film.tmdbScore === 'number'
                    ? film.tmdbScore.toFixed(1)
                    : 'N/A'}
            </TableCell>
            <TableCell>{film.genres.split(';').join(', ')}</TableCell>
            <TableCell>
                {typeof film.runtime === 'number'
                    ? `${Math.floor(film.runtime / 60)}h ${film.runtime % 60}m`
                    : '—'}
            </TableCell>
            <TableCell>
                {film.created
                    ? new Date(film.created).toLocaleDateString()
                    : '—'}
            </TableCell>
        </TableRow>
    )
}
