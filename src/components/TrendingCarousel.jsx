import imdb_logo from "/IMDb.svg"
import rotten_tomatoes_logo from "/rotten_tomatoes.svg"
import play_icon from "/Play.svg"
import { useEffect, useState } from "react"
import axios from "axios"
import { getImdbRating, getRottenTomatoesRating } from "../utils/helpers"
import { NavLink } from "react-router-dom"

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
                        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie}`
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
            className="flex h-[500px] flex-row items-center justify-between px-4 md:px-6 lg:px-12 xl:h-[600px]"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                            url(https://image.tmdb.org/t/p/original${backdrops[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <NavLink
                to={`/content/${movieDetails[index]?.imdbID}`}
                className="line-clamp-3 flex max-w-72 flex-col space-y-4 text-white lg:max-w-[450px]"
            >
                <span className="w-3/4 text-3xl font-bold md:w-full lg:text-5xl">
                    {movieDetails[index]?.Title}
                </span>
                {(imdbRating || rottenTomatoesRating) && (
                    <div className="flex w-3/4 space-x-10 text-sm md:w-full lg:text-lg">
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
                <div className="w-3/4 md:w-full">
                    <span className="line-clamp-4 text-xs font-medium lg:text-base">
                        {movieDetails[index]?.Plot}
                    </span>
                </div>
                {/* <button className="flex h-9 w-fit cursor-pointer flex-row items-center justify-between space-x-2 rounded-md bg-rose-700 px-4 py-1.5"> */}
                <button className="flex h-8 w-fit cursor-pointer flex-row items-center justify-between space-x-2 rounded-sm bg-rose-700 px-2 py-2 md:h-9 md:rounded-md md:px-4 md:py-1.5">
                    <img src={play_icon}></img>
                    <span className="font-bold text-white uppercase">
                        Watch trailer
                    </span>
                </button>
            </NavLink>
            <div className="flex flex-col text-xs text-white md:text-base">
                {Array.from({ length: movieDetails.length }, (_, i) => i).map(
                    (i) => (
                        <div
                            className="flex cursor-pointer flex-row items-center justify-end"
                            onClick={() => setIndex(i)}
                            key={i}
                        >
                            {index === i && (
                                <div className="h-[1px] w-2 bg-white md:h-[2px] md:w-3" />
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
