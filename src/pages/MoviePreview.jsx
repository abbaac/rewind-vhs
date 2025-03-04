import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import {
    getImdbRating,
    getMetacriticRating,
    getRottenTomatoesRating,
} from "../utils/helpers"
import imdb_logo from "/IMDb.svg"
import rotten_tomatoes_logo from "/rotten_tomatoes.svg"
import metacritic_logo from "/metacritic.svg"
import play_icon from "/Play.svg"
import { HiOutlineStar } from "react-icons/hi"

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
    const metacriticRating = movieData ? getMetacriticRating(movieData) : null

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
            <div
                className="flex h-96 flex-row items-center justify-between px-4 pt-10 text-white xl:h-[550px] xl:px-24 xl:pt-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
                          url(${Poster})`,
                    backgroundSize: "5%",
                    backgroundPosition: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <div className="flex h-full flex-row items-center py-8 xl:w-3/4">
                    <div
                        className="h-full w-2/5 border-2 border-white xl:h-[374px] xl:w-64 xl:px-4 xl:py-4"
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
                        {Poster !== "N/A" || (
                            <div className="flex h-full w-full flex-col items-center justify-center text-lg font-bold uppercase">
                                <span>Poster</span>
                                <span>Unavailable</span>{" "}
                            </div>
                        )}
                    </div>
                    <div className="h-full w-3/5 p-2 xl:w-3/4 xl:p-8">
                        <div className="line-clamp-3 flex max-w-[450px] flex-col space-y-2 text-white xl:space-y-4">
                            <span className="text-base font-bold xl:text-5xl">
                                {Title} ({Year})
                            </span>
                            <div className="xl flex flex-row text-xs">
                                <span className="font-bold capitalize">
                                    {Type}
                                    {totalSeasons &&
                                        `• ${totalSeasons} seasons`}
                                </span>
                            </div>
                            {(imdbRating ||
                                rottenTomatoesRating ||
                                metacriticRating) && (
                                <div className="flex space-x-5 text-xs xl:w-2/3">
                                    {imdbRating && (
                                        <div className="flex h-full space-x-2">
                                            <img src={imdb_logo} />
                                            <span> {imdbRating}</span>
                                        </div>
                                    )}
                                    {rottenTomatoesRating && (
                                        <div className="flex h-full space-x-2">
                                            <img src={rotten_tomatoes_logo} />
                                            <span>{rottenTomatoesRating}</span>
                                        </div>
                                    )}
                                    {/* {metacriticRating && (
                                        <div className="flex h-full space-x-2">
                                            <img src={metacritic_logo} />
                                            <span>{metacriticRating}</span>
                                        </div>
                                    )} */}
                                </div>
                            )}
                            <div>
                                <span className="text-xs font-medium">
                                    {Plot}
                                </span>
                            </div>
                            <button className="flex h-5 w-fit cursor-pointer flex-row items-center justify-between space-x-2 rounded-sm bg-rose-700 px-2 py-1 xl:h-9 xl:rounded-md xl:px-4 xl:py-1.5">
                                <img src={play_icon} className="h-full"></img>
                                <span className="text-xs font-bold text-white uppercase xl:text-base">
                                    Watch trailer
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="flex flex-col space-y-4 px-24 py-4">
                <div className="flex h-full flex-row justify-between">
                    <div className="flex w-fit flex-col space-y-2">
                        <div className="flex flex-col space-y-2">
                            <span className="font mb-3 text-3xl font-bold">
                                Popular Cast Members
                            </span>
                            <div className="flex flex-row space-x-4">
                                {Actors?.split(",").map((actor, index) => (
                                    <div
                                        key={index}
                                        className="flex h-60 w-40 flex-col justify-between rounded-lg shadow-xl"
                                    >
                                        <div
                                            className="h-3/4 rounded-t-md"
                                            style={
                                                Poster !== "N/A"
                                                    ? {
                                                          backgroundImage: `url(${Poster})`,
                                                          backgroundSize:
                                                              "cover",
                                                          backgroundPosition:
                                                              "center",
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              "gray",
                                                      }
                                            }
                                        ></div>
                                        <div className="p-2">
                                            <div className="line-clamp-1 font-bold">
                                                {actor.trim()}
                                            </div>
                                            <div>Lead Role</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className="font-bold">
                                Director:{" "}
                                <span className="font-medium">{Director}</span>
                            </span>
                            <span className="font-bold">
                                Writer:{" "}
                                <span className="font-medium">{Writer}</span>
                            </span>
                            <span className="font-bold">
                                Awards:{" "}
                                <span className="font-medium">{Awards}</span>
                            </span>
                        </div>
                    </div>
                    <div className="w-0.5 bg-black"></div>
                    <div className="flex w-fit flex-col space-y-2">
                        <span className="font mb-3 text-3xl font-bold">
                            Media Details
                        </span>
                        <div className="flex flex-col">
                            <span className="font-bold">Runtime</span>
                            <span className="font-medium text-gray-500">
                                {Runtime}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Rated</span>
                            <span className="font-medium text-gray-500">
                                {Rated}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Genre</span>
                            <span className="font-medium text-gray-500">
                                {Genre}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Language</span>
                            <span className="font-medium text-gray-500">
                                {Language}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Released</span>
                            <span className="font-medium text-gray-500">
                                {Released}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Country</span>
                            <span className="font-medium text-gray-500">
                                {Country}
                            </span>
                        </div>
                    </div>
                    <div className="w-0.5 bg-black"></div>

                    <NavLink className="flex w-fit flex-col space-y-2">
                        <span className="font mb-3 text-3xl font-bold">
                            Similar Recommendations
                        </span>
                        {Array.from({ length: 3 }, (_, i) => (
                            <div
                                className="flex h-32 w-96 flex-col justify-between rounded-lg p-4 shadow-md"
                                style={
                                    Poster !== "N/A"
                                        ? {
                                              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Poster})`,
                                              backgroundSize: "cover",
                                              backgroundPosition: "center",
                                          }
                                        : { backgroundColor: "gray" }
                                }
                            >
                                <div className="w-full text-lg font-bold text-white">
                                    {Title} ({Year})
                                </div>
                                <div>
                                    {(imdbRating || rottenTomatoesRating) && (
                                        <div className="flex w-full space-x-5 font-medium text-white">
                                            {imdbRating && (
                                                <div className="flex space-x-2">
                                                    <img src={imdb_logo} />
                                                    <span> {imdbRating}</span>
                                                </div>
                                            )}
                                            {rottenTomatoesRating && (
                                                <div className="flex space-x-2">
                                                    <img
                                                        src={
                                                            rotten_tomatoes_logo
                                                        }
                                                    />
                                                    <span>
                                                        {rottenTomatoesRating}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </NavLink>
                </div>

                <div className="w-full space-y-4">
                    <div>
                        <span className="font w-full text-3xl font-bold">
                            Reviews{" "}
                        </span>
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 3 }, (_, i) => (
                            <div className="flex h-32 w-full flex-col space-y-2 p-4 shadow-lg">
                                <div className="flex flex-row space-x-1.5">
                                    <span className="font-bold">John Doe</span>
                                    <span className="flex flex-row items-center">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <HiOutlineStar
                                                fill="gold"
                                                key={i}
                                            />
                                        ))}
                                    </span>
                                </div>
                                <span>
                                    "Absolutely loved this movie! The
                                    storytelling was top-notch, and the
                                    performances were incredible. The
                                    cinematography was stunning, and every scene
                                    kept me engaged. Definitely a must-watch!"
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default MoviePreview
