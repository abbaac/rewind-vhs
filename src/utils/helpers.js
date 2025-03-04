export function getImdbRating(movie) {
    const imdbRating = movie.Ratings.find(
        (r) => r.Source === "Internet Movie Database"
    )?.Value

    return imdbRating
}

export function getRottenTomatoesRating(movie) {
    const rottenTomatoesRating = movie.Ratings.find(
        (r) => r.Source === "Rotten Tomatoes"
    )?.Value

    return rottenTomatoesRating
}

export function getMetacriticRating(movie) {
    const metacriticRating = movie.Ratings.find(
        (r) => r.Source === "Metacritic"
    )?.Value

    return metacriticRating
}
