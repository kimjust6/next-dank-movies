import type { FilmListsResponse } from '@/lib/pocketbase-types'
import Image from 'next/image'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card'

interface FilmListCardProps {
    filmList: FilmListsResponse
}

export function FilmListCard({ filmList }: FilmListCardProps) {
    return (
        <Link href={`/film-list/${filmList.id}`}>
            <Card className="transition-all duration-300 hover:scale-105 hover:cursor-pointer">
                <CardHeader>
                    <CardTitle>{filmList.title}</CardTitle>
                    <CardDescription>
                        {new Date(filmList.created).toLocaleDateString()}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                        {filmList.cover ? (
                            <Image
                                src={filmList.cover}
                                alt={filmList.title}
                                width={500}
                                height={281}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="bg-secondary flex h-full w-full items-center justify-center">
                                <p className="text-muted-foreground">
                                    No cover image
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </Link>
    )
}
