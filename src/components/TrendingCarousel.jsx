import imdb_logo from "/IMDb.svg"
import rotten_tomatoes_logo from "/rotten_tomatoes.svg"
import play_icon from "/Play.svg"
import { useEffect, useState } from "react"
import axios from "axios"
import { getImdbRating, getRottenTomatoesRating } from "../utils/helpers"

function TrendingCarousel({ movies }) {
    const [index, setIndex] = useState(2)
    const [movieDetails, setMovieDetails] = useState([]) // Store OMDb movie details
    const [backdrops, setBackdrops] = useState([]) // Store TMDb backdrops
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY
    const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch OMDb details
                const omdbRequests = movies.map((movie) =>
                    fetch(
                        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie}`
                    ).then((res) => {
                        if (!res.ok)
                            throw new Error("Failed to fetch OMDb data")
                        return res.json()
                    })
                )

                // Fetch TMDb backdrops
                const tmdbRequests = movies.map((movie) =>
                    axios.get(
                        `https://api.themoviedb.org/3/find/${movie}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
                    )
                )

                // Fetch both OMDb and TMDb data simultaneously
                const [omdbResponses, tmdbResponses] = await Promise.all([
                    Promise.all(omdbRequests),
                    Promise.all(tmdbRequests),
                ])

                // Extract backdrops
                const backdropsArray = tmdbResponses.map(
                    (res) => res.data.movie_results?.[0]?.backdrop_path || null
                )

                setMovieDetails(omdbResponses)
                setBackdrops(backdropsArray)
            } catch (error) {
                console.error("Error fetching movie data:", error)
            }
        }

        if (movies.length) fetchData()
    }, [movies])

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) =>
                prevIndex === movies.length - 1 ? 0 : prevIndex + 1
            )
        }, 4000)

        return () => clearInterval(interval)
    }, [movies.length])

    const imdbRating = movieDetails[index]
        ? getImdbRating(movieDetails[index])
        : null
    const rottenTomatoesRating = movieDetails[index]
        ? getRottenTomatoesRating(movieDetails[index])
        : null

    return (
        <div
            className="flex h-[500px] flex-row items-center justify-between px-4 xl:h-[600px] xl:px-24"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                            url(https://image.tmdb.org/t/p/original${backdrops[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <div className="line-clamp-3 flex max-w-72 flex-col space-y-4 text-white xl:max-w-[450px]">
                <span className="text-xl font-bold xl:text-5xl">
                    {movieDetails[index]?.Title}
                </span>
                {(imdbRating || rottenTomatoesRating) && (
                    <div className="flex space-x-10 text-base xl:text-lg">
                        {imdbRating && (
                            <div className="flex space-x-2">
                                <img src={imdb_logo} />
                                <span> {imdbRating}</span>
                            </div>
                        )}
                        {rottenTomatoesRating && (
                            <div className="flex space-x-2">
                                <img src={rotten_tomatoes_logo} />
                                <span>{rottenTomatoesRating}</span>
                            </div>
                        )}
                    </div>
                )}
                <div>
                    <span className="line-clamp-4 text-base font-medium">
                        {movieDetails[index]?.Plot}
                    </span>
                </div>
                <button className="flex h-9 w-fit cursor-pointer flex-row items-center justify-between space-x-2 rounded-md bg-rose-700 px-4 py-1.5">
                    <img src={play_icon}></img>
                    <span className="font-bold text-white uppercase">
                        Watch trailer
                    </span>
                </button>
            </div>
            <div className="flex flex-col text-white">
                {Array.from({ length: movieDetails.length }, (_, i) => i).map(
                    (i) => (
                        <div
                            className="flex cursor-pointer flex-row items-center justify-end"
                            onClick={() => setIndex(i)}
                            key={i}
                        >
                            {index === i && (
                                <div className="h-[2.5px] w-3 bg-white" />
                            )}
                            <div className="flex w-5 flex-row items-center justify-center space-x-2 font-medium">
                                {i + 1}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default TrendingCarousel
