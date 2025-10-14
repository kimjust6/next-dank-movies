import { FilmListTableRow } from '@/components/FilmListTableRow'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { FilmListsResponse } from '@/lib/pocketbase-types'

interface FilmListTableProps {
    filmLists: FilmListsResponse[]
}

export function FilmListTable({ filmLists }: FilmListTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Cover</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Films</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filmLists.map((filmList) => (
                    <FilmListTableRow key={filmList.id} filmList={filmList} />
                ))}
            </TableBody>
        </Table>
    )
}
