function MovieDetails({ Movie }) {
    const {
        Actors,
        Director,
        Writer,
        Awards,
        Plot,
        Country,
        Genre,
        Language,
        Rated,
        Released,
        Runtime,
        Poster,
    } = Movie

    const mediaDetails = [
        "Country",
        "Genre",
        "Language",
        "Rated",
        "Released",
        "Runtime",
    ]

    const filmCrew = ["Actors", "Director", "Writer", "Awards"]

    return (
        <div className="flex h-full w-full flex-row justify-between gap-6 xl:flex-row">
            <div className="flex w-3/5 flex-col space-y-4">
                <span className="font mb-3 font-bold xl:text-3xl">Plot </span>
                <div className="w-full overflow-y-auto text-start text-xs font-medium xl:text-base">
                    {Plot}
                </div>
                <div className="flex w-full flex-col space-y-2">
                    <span className="font mb-3 font-bold xl:text-3xl">
                        Cast Members
                    </span>
                    <div className="flex w-full flex-row space-x-2 overflow-x-auto py-1">
                        {Actors?.split(",").map((actor, index) => (
                            <div
                                key={index}
                                className="flex h-44 w-26 shrink-0 flex-col rounded-lg shadow-lg xl:h-60 xl:w-40"
                            >
                                <div
                                    className="h-3/4 rounded-t-md"
                                    style={
                                        Poster !== "N/A"
                                            ? {
                                                  backgroundImage: `url(${Poster})`,
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center",
                                              }
                                            : {
                                                  backgroundColor: "gray",
                                              }
                                    }
                                ></div>
                                <div className="p-2 text-xs xl:text-base">
                                    <div className="line-clamp-1 font-bold">
                                        {actor.trim()}
                                    </div>
                                    <div>Lead Role</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col space-y-2 text-xs xl:text-base">
                    <span className="font-bold">
                        Director:{" "}
                        <span className="font-medium">{Director}</span>
                    </span>
                    <span className="font-bold">
                        Writer: <span className="font-medium">{Writer}</span>
                    </span>
                    <span className="font-bold">
                        Awards: <span className="font-medium">{Awards}</span>
                    </span>
                </div>
            </div>
            <div className="flex w-2/5 flex-col items-end space-y-2">
                <span className="font mb-3 text-end font-bold xl:text-3xl">
                    Media Details
                </span>
                {mediaDetails.map((objectKey) => (
                    <div
                        className="flex w-full flex-col items-end text-xs xl:text-base"
                        key={objectKey}
                    >
                        <span className="font-bold">{objectKey}</span>
                        <span className="w-full text-right font-medium text-gray-500">
                            {Movie[objectKey]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieDetails
