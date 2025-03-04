import imdb_logo from "/IMDb.svg"
import rotten_tomatoes_logo from "/rotten_tomatoes.svg"
import { NavLink } from "react-router-dom"
import { HiHeart } from "react-icons/hi"
import { useEffect, useState } from "react"
import { getImdbRating, getRottenTomatoesRating } from "../utils/helpers"

function Movie({ movie }) {
    const [movieData, setMovieData] = useState("")
    const [error, setError] = useState("")
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY
    const [like, setLike] = useState(false)

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setError("")
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie}`
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
    }, [movie])

    const imdbRating = movieData ? getImdbRating(movieData) : null
    const rottenTomatoesRating = movieData
        ? getRottenTomatoesRating(movieData)
        : null

    const { Poster, Title, Genre, Year, Type, imdbID } = movieData

    return (
        <NavLink
            className="flex w-full flex-col gap-2 xl:w-64"
            to={`/content/${imdbID}`}
            onClick={() => window.scrollTo(0, 0)}
        >
            <div
                className="min-h-[177px] w-full space-x-2 px-4 py-4 xl:min-h-[370px]"
                style={
                    Poster !== "N/A"
                        ? {
                              backgroundImage: `url(${Poster})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                          }
                        : { backgroundColor: "gray" }
                }
            >
                <div className="relative flex h-full flex-col">
                    <div className="flex flex-row items-center justify-between">
                        {Type === "series" && (
                            <div className="h-fit rounded-xl bg-[#F3F4F6]/70 px-2 py-0.5 text-xs font-bold">
                                TV SERIES
                            </div>
                        )}
                        <button
                            className="z-50 ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#F3F4F6]/70 p-0.5 xl:h-8 xl:w-8 xl:p-1"
                            onClick={() => setLike(!like)}
                        >
                            {like ? (
                                <HiHeart color="red" className="size-full" />
                            ) : (
                                <HiHeart
                                    color="#F3F4F6"
                                    className="size-full"
                                />
                            )}
                        </button>
                    </div>
                    {Poster !== "N/A" || (
                        <div className="absolute flex h-full w-full flex-col items-center justify-center text-lg font-bold uppercase">
                            <span>Poster</span>
                            <span>Unavailable</span>{" "}
                        </div>
                    )}
                </div>
            </div>

            <div className="text-xs font-bold text-gray-400">{Year}</div>
            <div className="font-bold">{Title}</div>
            <div className="flex flex-row justify-between text-xs">
                <div className="flex items-center space-x-2">
                    <img src={imdb_logo} />
                    <span>{imdbRating || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={rotten_tomatoes_logo} />
                    <span>{rottenTomatoesRating || "N/A"}</span>
                </div>
            </div>
            <div className="text-xs font-bold text-gray-400">{Genre}</div>
        </NavLink>
    )
}

export default Movie
