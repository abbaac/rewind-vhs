import { useState, useEffect } from "react"

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export function useMovieDetails(imdbID) {
    const [movieData, setMovieData] = useState(null)
    const [error, setError] = useState("")

    console.log("API Key: ", API_KEY)
    console.log(imdbID)

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
                console.error(error.message)
                setError(error.message)
            }
        }

        if (imdbID) {
            getMovieDetails()
        }
    }, [imdbID])

    return { movieData, error }
}
