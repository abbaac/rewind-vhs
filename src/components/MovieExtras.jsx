import { NavLink } from "react-router-dom"
import imdb_logo from "/IMDb.svg"
import rotten_tomatoes_logo from "/rotten_tomatoes.svg"
import { HiOutlineStar } from "react-icons/hi"

function MovieExtras({ Movie, ratings }) {
    const { imdbRating, rottenTomatoesRating } = ratings

    const { Poster, Title, Year } = Movie

    return (
        <div className="flex w-full flex-col gap-y-4 xl:flex-row">
            <div className="space-y-4 xl:w-2/3">
                <div>
                    <span className="font w-full font-bold xl:text-3xl">
                        Reviews{" "}
                    </span>
                </div>
                <div className="space-y-2 xl:space-y-4">
                    {Array.from({ length: 3 }, (_, i) => (
                        <div
                            className="flex w-full flex-col space-y-2 overflow-auto p-1 text-xs shadow-lg xl:h-32 xl:p-4 xl:text-base"
                            key={i}
                        >
                            <div className="flex flex-row space-x-1.5">
                                <span className="font-bold">John Doe</span>
                                <span className="flex flex-row items-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <HiOutlineStar fill="gold" key={i} />
                                    ))}
                                </span>
                            </div>
                            <span>
                                "Absolutely loved this movie! The storytelling
                                was top-notch, and the performances were
                                incredible. The cinematography was stunning, and
                                every scene kept me engaged. Definitely a
                                must-watch!"
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full flex-col space-y-4 xl:w-1/3 xl:items-end">
                <span className="font mb-3 w-fit font-bold xl:text-3xl">
                    Recommendations
                </span>
                {Array.from({ length: 3 }, (_, i) => (
                    <NavLink
                        key={i}
                        className="flex h-20 w-full flex-col justify-around rounded-lg p-4 shadow-md xl:h-32 xl:w-96"
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
                        <div className="w-full text-sm font-bold text-white xl:text-xl">
                            {Title} ({Year})
                        </div>
                        <div>
                            {(imdbRating || rottenTomatoesRating) && (
                                <div className="flex w-full space-x-5 text-xs font-medium text-white xl:text-lg">
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
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default MovieExtras
