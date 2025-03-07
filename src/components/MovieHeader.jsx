import imdb_logo from "/IMDb.svg"
import rotten_tomatoes_logo from "/rotten_tomatoes.svg"
import play_icon from "/Play.svg"
import {
    getImdbRating,
    getMetacriticRating,
    getRottenTomatoesRating,
} from "../utils/helpers"

function MovieHeader({ Movie, ratings }) {
    const { imdbRating, rottenTomatoesRating } = ratings
    const { Title, Plot, Poster, Year, Type, totalSeasons } = Movie

    return (
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
                        <div className="flex flex-row text-sm xl:text-2xl">
                            <span className="font-bold capitalize">
                                {Type}
                                {totalSeasons && ` • ${totalSeasons} seasons`}
                            </span>
                        </div>
                        {(imdbRating || rottenTomatoesRating) && (
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
                            </div>
                        )}
                        <div>
                            <span className="text-xs font-medium xl:text-base">
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
    )
}

export default MovieHeader
