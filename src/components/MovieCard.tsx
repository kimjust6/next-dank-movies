import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { getPosterUrl } from '@/lib/tmdb-service'
import { Movie, posterSize } from '@/lib/types'
import { Calendar, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface MovieCardProps {
    movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
    const posterUrl = getPosterUrl(
        movie.poster_path ?? movie.backdrop_path,
        posterSize.w342
    )

    const year = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'N/A'

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

    return (
        <Link href={`/movie/${movie.id}`}>
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <CardHeader className="p-0">
                    <div className="bg-muted relative aspect-[2/3] w-full overflow-hidden">
                        <Image
                            src={posterUrl}
                            alt={movie.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-lg font-semibold transition-colors">
                        {movie.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                        {movie.overview || 'No description available'}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-medium">{rating}</span>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{year}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Badge variant="secondary" className="text-xs">
                        {movie.original_language.toUpperCase()}
                    </Badge>
                </CardFooter>
            </Card>
        </Link>
    )
}
