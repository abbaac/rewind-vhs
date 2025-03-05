import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getImdbRating, getRottenTomatoesRating } from "../utils/helpers"
import MovieHeader from "../components/MovieHeader"
import MovieDetails from "../components/MovieDetails"
import MovieExtras from "../components/MovieExtras"

function MoviePreview() {
    const [movieData, setMovieData] = useState("")
    const [error, setError] = useState("")
    const params = useParams()
    const imdbID = params.id
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setError("")
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
                )

                if (!res.ok) {
                    throw new Error("Something went wrong when fetching movies")
                }

                const data = await res.json()
                setMovieData(data)
            } catch (error) {
                console.log(error.message)
                setError(error.message)
            }
        }

        getMovieDetails()
    }, [imdbID])

    const imdbRating = movieData ? getImdbRating(movieData) : null
    const rottenTomatoesRating = movieData
        ? getRottenTomatoesRating(movieData)
        : null

    const ratings = { imdbRating, rottenTomatoesRating }

    const {
        Title,
        Year,
        Poster,
        Plot,
        Director,
        Writer,
        Actors,
        Rated,
        Released,
        Runtime,
        Genre,
        Language,
        Country,
        Awards,
        Type,
        totalSeasons,
    } = movieData

    return (
        <div className="flex w-full flex-col pb-10">
            <MovieHeader Movie={movieData} ratings={ratings} />
            <div className="flex w-full flex-col space-y-4 px-4 py-4 xl:px-24">
                <MovieDetails Movie={movieData} />
                <MovieExtras Movie={movieData} ratings={ratings} />
            </div>
        </div>
    )
}

export default MoviePreview
