import { useEffect, useState } from "react"
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi"
import { NavLink } from "react-router-dom"

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY

    const displayResults = searchQuery.length > 1
    useEffect(() => {
        const controller = new AbortController()

        async function fetchMovies() {
            try {
                setError("")
                setIsLoading(true)
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`,
                    { signal: controller.signal }
                )

                if (!res.ok) {
                    throw new Error("Something went wrong when fetching movies")
                }

                const data = await res.json()

                if (data.Response === "False") {
                    throw new Error("Movie not found")
                }
                setMovies(data.Search)
                setError("")
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.log(error.message)
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        if (searchQuery.length < 2) {
            setMovies([])
            return
        }

        fetchMovies()

        return function () {
            controller.abort()
        }
    }, [searchQuery])

    return (
        <div className="h-full w-52 xl:relative xl:h-9 xl:w-[525px]">
            <div
                className={`flex h-full w-full cursor-text flex-row items-center space-x-1 xl:space-x-2 xl:border-2 xl:px-2.5 xl:py-1 ${
                    displayResults ? "xl:rounded-t-md" : "xl:rounded-md"
                }`}
            >
                {searchQuery ? (
                    <HiOutlineX
                        onClick={() => {
                            setSearchQuery("")
                        }}
                        className="h-full cursor-pointer xl:size-6"
                    />
                ) : (
                    <HiOutlineSearch className="h-full xl:size-6" />
                )}
                <input
                    placeholder="What are you watching?"
                    className="text-md h-full w-full outline-0"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                />
            </div>
            {displayResults && (
                <div className="absolute top-0 left-0 mt-14 flex h-fit max-h-80 w-full flex-col divide-y-2 divide-black overflow-y-auto rounded-b-md border-x-2 border-b-2 border-white bg-gray-100 text-black xl:mt-0 xl:mt-9 xl:max-h-96">
                    {isLoading && (
                        <div className="flex h-fit w-full shrink-0 flex-row p-2">
                            <span> Loading</span>
                            <span className="animate-bounce">.</span>
                            <span className="animate-bounce [animation-delay:0.1s]">
                                .
                            </span>
                            <span className="animate-bounce [animation-delay:0.2s]">
                                .
                            </span>
                        </div>
                    )}
                    {!isLoading &&
                        !error &&
                        movies.map((movie) => (
                            <NavLink
                                to={`content/${movie.imdbID}`}
                                key={movie.imdbID}
                                className="flex h-32 w-full shrink-0 flex-row p-2 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-white active:bg-gray-500"
                                onClick={() => {
                                    setSearchQuery("")
                                    setMovies([])
                                }}
                            >
                                <div
                                    className="h-full w-1/6"
                                    style={
                                        movie.Poster !== "N/A"
                                            ? {
                                                  backgroundImage: `url(${movie.Poster})`,
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center",
                                              }
                                            : { backgroundColor: "gray" }
                                    }
                                >
                                    {movie.Poster !== "N/A" || (
                                        <div className="flex h-full w-full flex-col items-center justify-center text-[10px] font-bold uppercase">
                                            <span>Poster</span>
                                            <span>Unavailable</span>{" "}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-5/6 flex-col justify-between px-2 py-1 font-bold">
                                    <span>
                                        <span className="line-clamp-2 text-xl text-black">
                                            {movie.Title}
                                        </span>
                                        <span className="line-clamp-1 text-xs text-gray-600">
                                            {movie.Year}
                                        </span>
                                    </span>
                                    <span className="line-clamp-1 text-xs text-gray-600 capitalize">
                                        {movie.Type}
                                    </span>
                                </div>
                            </NavLink>
                        ))}
                    {error && (
                        <div className="flex h-fit w-full shrink-0 flex-row p-2">
                            {error}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
