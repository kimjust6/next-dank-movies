import { Badge } from '@/components/ui/badge'
import {
    getBackdropUrl,
    getMovieDetails,
    getPosterUrl,
} from '@/lib/tmdb-service'
import { backdropSize, posterSize } from '@/lib/types'
import { Star } from 'lucide-react'
import Image from 'next/image'

type MovieDetailsPageProps = {
    params: {
        'movie-id': string
    }
}

async function MovieDetails({ params }: MovieDetailsPageProps) {
    const movieId = parseInt(params['movie-id'])
    const movie = await getMovieDetails(movieId)

    const posterUrl = getPosterUrl(movie.poster_path, posterSize.w500)
    const backdropUrl = getBackdropUrl(movie.backdrop_path, backdropSize.w1280)

    return (
        <div className="relative h-screen w-full">
            <div className="absolute top-0 left-0 h-full w-full">
                <Image
                    src={backdropUrl}
                    alt={movie.title}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                />
                <div className="from-background via-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>

            <div className="relative container mx-auto grid grid-cols-1 items-center gap-8 px-4 pt-24 md:grid-cols-3 md:px-6">
                <div className="md:col-span-1">
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        width={500}
                        height={750}
                        className="rounded-lg shadow-2xl"
                    />
                </div>
                <div className="space-y-4 md:col-span-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                        {movie.title}
                    </h1>
                    {movie.tagline && (
                        <p className="text-muted-foreground text-xl">
                            {movie.tagline}
                        </p>
                    )}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            <span className="font-semibold">
                                {movie.vote_average.toFixed(1)} / 10
                            </span>
                        </div>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-muted-foreground">
                            {movie.release_date.split('-')[0]}
                        </span>
                        {movie.runtime ? (
                            <>
                                <span className="text-muted-foreground">|</span>
                                <span className="text-muted-foreground">
                                    {Math.floor(movie.runtime / 60)}h{' '}
                                    {movie.runtime % 60}m
                                </span>
                            </>
                        ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                            <Badge key={genre.id} variant="outline">
                                {genre.name}
                            </Badge>
                        ))}
                    </div>
                    <div className="max-w-prose">
                        <h2 className="mt-6 text-2xl font-semibold">
                            Overview
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
