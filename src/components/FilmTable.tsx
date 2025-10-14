import { FilmTableRow } from '@/components/FilmTableRow'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { FilmsResponse } from '@/lib/pocketbase-types'
import { cn } from '@/lib/utils'

interface FilmTableProps {
    films: FilmsResponse[]
    className?: string
}

export function FilmTable({ films, className }: FilmTableProps) {
    return (
        <Table className={cn(className)}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Poster</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {films.map((film) => (
                    <FilmTableRow key={film.id} film={film} />
                ))}
            </TableBody>
        </Table>
    )
}
