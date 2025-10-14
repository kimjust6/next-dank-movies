'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import type { FilmsResponse } from '@/lib/pocketbase-types'
import { getPosterUrl } from '@/lib/tmdb-service'
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
                    src={getPosterUrl(film.poster)}
                    alt={film.title}
                    width={100}
                    height={150}
                    className="rounded-md"
                    priority
                />
            </TableCell>
            <TableCell>
                <Link href={`/movie/${film.tmdbId}`}>{film.title}</Link>
            </TableCell>
            <TableCell>
                {new Date(film.releaseDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{film.tmdbScore.toFixed(1)}</TableCell>
        </TableRow>
    )
}
