'use client'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { FilmListsResponse } from '@/lib/pocketbase-types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface FilmListTableRowProps {
    filmList: FilmListsResponse
}

export function FilmListTableRow({ filmList }: FilmListTableRowProps) {
    const router = useRouter()

    function handleNavigate() {
        router.push(`/film-list/${filmList.id}`)
    }

    return (
        <TableRow
            onClick={handleNavigate}
            className="cursor-pointer"
            key={filmList.id}
        >
            <TableCell className="font-medium">
                <div className="relative h-24 w-16 overflow-hidden rounded-md">
                    {filmList.cover ? (
                        <Image
                            src={filmList.cover}
                            alt={filmList.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="bg-secondary flex h-full w-full items-center justify-center">
                            <p className="text-muted-foreground text-xs">
                                No cover
                            </p>
                        </div>
                    )}
                </div>
            </TableCell>
            <TableCell>{filmList.title}</TableCell>
            <TableCell>
                {new Date(filmList.created).toLocaleDateString()}
            </TableCell>
            <TableCell>0</TableCell>
            <TableCell className="text-right">
                <Button variant="outline" size="sm">
                    View
                </Button>
            </TableCell>
        </TableRow>
    )
}
