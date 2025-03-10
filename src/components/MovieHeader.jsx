import imdb_logo from "/IMDb.svg"
import rotten_tomatoes_logo from "/rotten_tomatoes.svg"
import play_icon from "/Play.svg"

function MovieHeader({ Movie, ratings }) {
    const { imdbRating, rottenTomatoesRating } = ratings
    const { Title, Poster, Year, Type, totalSeasons } = Movie

    return (
        <div
            className="flex h-72 flex-row items-center justify-between px-4 pt-14 text-white md:h-96 lg:px-12 xl:h-[550px] xl:pt-20"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
          url(${Poster})`,
                backgroundSize: "5%",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <div className="flex h-full w-full flex-row items-center py-3.5 md:space-x-2 xl:py-7">
                <div className="w-36 border-2 border-white md:h-full md:w-52 xl:w-72">
                    {Poster !== "N/A" ? (
                        <img
                            src={Poster}
                            alt={`${Title}`}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-500 text-lg font-bold uppercase xl:px-4 xl:py-4">
                            <span>Poster</span>
                            <span>Unavailable</span>{" "}
                        </div>
                    )}
                </div>
                <div className="flex h-full w-1/2 flex-col justify-evenly px-2 xl:px-8">
                    <span className="text-lg font-bold md:text-3xl lg:text-5xl">
                        {Title} ({Year})
                    </span>
                    <div className="flex flex-row text-sm md:text-xl lg:text-3xl">
                        <span className="font-bold capitalize">
                            {Type}
                            {totalSeasons && ` • ${totalSeasons} seasons`}
                        </span>
                    </div>
                    {(imdbRating || rottenTomatoesRating) && (
                        <div className="flex w-full space-x-2 text-xs md:space-x-5 md:text-lg lg:text-xl">
                            {imdbRating && (
                                <span className="flex space-x-1 md:space-x-2">
                                    <img src={imdb_logo} className="h-full" />
                                    <span> {imdbRating}</span>
                                </span>
                            )}
                            {rottenTomatoesRating && (
                                <span className="flex space-x-1 md:space-x-2">
                                    <img
                                        src={rotten_tomatoes_logo}
                                        className="h-full"
                                    />
                                    <span>{rottenTomatoesRating}</span>
                                </span>
                            )}
                        </div>
                    )}
                    <button className="flex h-6 w-fit cursor-pointer flex-row items-center justify-between space-x-2 rounded-sm bg-rose-700 px-1 py-1 md:h-9 md:rounded-md md:px-4 md:py-1.5">
                        <img src={play_icon} className="h-full"></img>
                        <span className="text-xs font-bold text-white uppercase md:text-base">
                            Watch trailer
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieHeader
