import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { FilmsResponse } from '@/lib/pocketbase-types'
import { getPosterUrl } from '@/lib/tmdb-service'
import type { Movie } from '@/lib/types'
import { posterSize } from '@/lib/types'
import { Calendar, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface MovieCardProps {
    movie?: Movie
    film?: FilmsResponse
}

function isMovie(data: Movie | FilmsResponse): data is Movie {
    return (data as Movie).vote_average !== undefined
}

export function MovieCard({ movie, film }: MovieCardProps) {
    const data = movie || film
    if (!data) {
        return null
    }

    const id = isMovie(data) ? data.id : data.tmdbId
    const title = data.title
    const overview = isMovie(data) ? data.overview : data.overview
    const posterPath = isMovie(data)
        ? (data.poster_path ?? data.backdrop_path)
        : data.posterUrl
    const releaseDate = isMovie(data) ? data.release_date : data.releaseDate
    const rating = isMovie(data) ? data.vote_average : data.tmdbScore
    const originalLanguage = isMovie(data)
        ? data.original_language
        : data.originalLanguage

    const posterUrl = posterPath
        ? isMovie(data)
            ? getPosterUrl(posterPath, posterSize.w342)
            : posterPath
        : '/placeholder.svg'

    const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'
    const displayRating = rating ? rating.toFixed(1) : 'N/A'

    return (
        <Link href={`/movie/${id}`}>
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <CardHeader className="p-0">
                    <div className="bg-muted relative aspect-[2/3] w-full overflow-hidden">
                        <Image
                            src={posterUrl}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-lg font-semibold transition-colors">
                        {title}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                        {overview || 'No description available'}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-medium">{displayRating}</span>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{year}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Badge variant="secondary" className="text-xs">
                        {originalLanguage.toUpperCase()}
                    </Badge>
                </CardFooter>
            </Card>
        </Link>
    )
}
