import { FilmTableRow } from '@/components/FilmTableRow'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { FilmsResponse } from '@/lib/pocketbase-types'

interface FilmTableProps {
    films: FilmsResponse[]
}

export function FilmTable({ films }: FilmTableProps) {
    return (
        <Table>
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
