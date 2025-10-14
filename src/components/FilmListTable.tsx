import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { FilmListsResponse } from '@/lib/pocketbase-types'
import { FilmListTableRow } from '@/components/FilmListTableRow'

interface FilmListTableProps {
    filmLists: FilmListsResponse[]
}

export function FilmListTable({ filmLists }: FilmListTableProps) {
    return (
        <Table>
            <TableCaption>A list of your film lists.</TableCaption>
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
