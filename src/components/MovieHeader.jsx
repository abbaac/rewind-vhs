import imdb_logo from "/IMDb.svg"
import rotten_tomatoes_logo from "/rotten_tomatoes.svg"
import play_icon from "/Play.svg"

function MovieHeader({ Movie, ratings }) {
    const { imdbRating, rottenTomatoesRating } = ratings
    const { Title, Plot, Poster, Year, Type, totalSeasons } = Movie

    return (
        <div
            className="flex h-96 flex-row items-center justify-between px-4 pt-14 text-white xl:h-[550px] xl:px-24 xl:pt-20"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
          url(${Poster})`,
                backgroundSize: "5%",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <div className="flex h-full w-full flex-row items-center py-3.5 xl:py-7">
                <div className="w h-full border-2 border-white xl:w-72">
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
                <div className="flex h-full w-1/2 flex-col justify-center space-y-2 px-2 xl:space-y-3 xl:px-8">
                    {/* <div className="line-clamp-3 flex max-w-[450px] flex-col text-white xl:justify-between"> */}
                    <span className="text-base font-bold xl:text-5xl">
                        {Title} ({Year})
                    </span>
                    <div className="flex flex-row text-sm xl:text-lg">
                        <span className="font-bold capitalize">
                            {Type}
                            {totalSeasons && ` • ${totalSeasons} seasons`}
                        </span>
                    </div>
                    {(imdbRating || rottenTomatoesRating) && (
                        <div className="flex space-x-5 text-sm">
                            {imdbRating && (
                                <span className="flex h-full space-x-2">
                                    <img src={imdb_logo} />
                                    <span> {imdbRating}</span>
                                </span>
                            )}
                            {rottenTomatoesRating && (
                                <span className="flex h-full space-x-2">
                                    <img src={rotten_tomatoes_logo} />
                                    <span>{rottenTomatoesRating}</span>
                                </span>
                            )}
                        </div>
                    )}
                    <div className="overflow-y-auto text-xs font-medium xl:text-base">
                        {Plot}
                    </div>
                    <button className="flex h-6 w-fit cursor-pointer flex-row items-center justify-between space-x-2 rounded-sm bg-rose-700 px-2 py-1 xl:h-9 xl:rounded-md xl:px-4 xl:py-1.5">
                        <img src={play_icon} className="h-full"></img>
                        <span className="text-xs font-bold text-white uppercase xl:text-base">
                            Watch trailer
                        </span>
                    </button>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default MovieHeader
