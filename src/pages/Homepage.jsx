import MovieCarousel from "../components/MovieCarousel"
import TrendingCarousel from "../components/TrendingCarousel"

const trending_ids = [
    "tt1517268", // Barbie (2023)
    "tt6791350", // Guardians of the Galaxy Vol. 3 (2023)
    "tt10366206", // John Wick: Chapter 4 (2023)
    "tt1630029", // Avatar: The Way of Water (2022)
    "tt9764362", // The Menu (2022)
]

const featured_ids = [
    "tt1375666", // Inception (2010)
    "tt0111161", // The Shawshank Redemption (1994)
    "tt0468569", // The Dark Knight (2008)
    "tt0133093", // The Matrix (1999)
    "tt0109830", // Forrest Gump (1994)
    "tt0137523", // Fight Club (1999)
    "tt0120737", // The Lord of the Rings: The Fellowship of the Ring (2001)
    "tt0167260", // The Lord of the Rings: The Two Towers (2002)
    "tt0167261", // The Lord of the Rings: The Return of the King (2003)
    "tt1853728", // Django Unchained (2012)
    "tt7286456", // Joker (2019)
    "tt4154796", // Avengers: Endgame (2019)
    "tt4154756", // Avengers: Infinity War (2018)
    "tt1345836", // The Dark Knight Rises (2012)
    "tt0816692", // Interstellar (2014)
    "tt0114369", // Se7en (1995)
    "tt0993846", // The Wolf of Wall Street (2013)
    "tt0110912", // Pulp Fiction (1994)
    "tt0080684", // Star Wars: The Empire Strikes Back (1980)
    "tt0172495", // Gladiator (2000)
]

const new_arrivals = [
    "tt15398776", // Wonka (2023)
    "tt9362722", // Godzilla x Kong: The New Empire (2024)
    "tt11703244", // Dune: Part Two (2024)
    "tt15789038", // The Marvels (2023)
    "tt9603212", // The Hunger Games: The Ballad of Songbirds and Snakes (2023)
    "tt10640346", // Aquaman and the Lost Kingdom (2023)
    "tt10545296", // Mission: Impossible – Dead Reckoning Part One (2023)
    "tt9606314", // Spider-Man: Across the Spider-Verse (2023)
    "tt1630029", // Avatar: The Way of Water (2022)
    "tt8760708", // Oppenheimer (2023)
    "tt10648342", // The Creator (2023)
    "tt10954600", // Napoleon (2023)
    "tt12758060", // Five Nights at Freddy's (2023)
    "tt9603212", // The Hunger Games: The Ballad of Songbirds and Snakes (2023)
    "tt11245972", // The Equalizer 3 (2023)
    "tt10151854", // Rebel Moon (2023)
    "tt6856242", // The Exorcist: Believer (2023)
    "tt14537248", // Wish (2023)
    "tt15398776", // Wonka (2023)
    "tt13833688", // The Flash (2023)
]

const top_rated = [
    "tt0111161", // The Shawshank Redemption (1994)
    "tt0068646", // The Godfather (1972)
    "tt0468569", // The Dark Knight (2008)
    "tt0071562", // The Godfather Part II (1974)
    "tt0050083", // 12 Angry Men (1957)
    "tt0108052", // Schindler’s List (1993)
    "tt0167260", // The Lord of the Rings: The Two Towers (2002)
    "tt0110912", // Pulp Fiction (1994)
    "tt0060196", // The Good, the Bad and the Ugly (1966)
    "tt0120737", // The Lord of the Rings: The Fellowship of the Ring (2001)
    "tt0109830", // Forrest Gump (1994)
    "tt0137523", // Fight Club (1999)
    "tt1375666", // Inception (2010)
    "tt0167261", // The Lord of the Rings: The Return of the King (2003)
    "tt0114369", // Se7en (1995)
    "tt0118799", // Life Is Beautiful (1997)
    "tt0114814", // The Usual Suspects (1995)
    "tt0110413", // Léon: The Professional (1994)
    "tt0080684", // Star Wars: The Empire Strikes Back (1980)
    "tt0133093", // The Matrix (1999)
]

function Homepage() {
    return (
        <div>
            <TrendingCarousel movies={trending_ids} />
            <div className="space-y-12 py-12">
                <MovieCarousel
                    listTitle={"Featured Movies"}
                    movies={featured_ids}
                />
                <MovieCarousel
                    listTitle={"New Arrivals"}
                    movies={new_arrivals}
                />
                <MovieCarousel listTitle={"Top Rated"} movies={top_rated} />
            </div>
        </div>
    )
}

export default Homepage
