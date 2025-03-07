import { NavLink } from "react-router-dom"
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi2"
import { useState, useEffect } from "react"
import Movie from "./Movie"

function MovieCarousel({ listTitle, movies }) {
    const [index, setIndex] = useState(0)
    const [carouselLength, setCarouselLength] = useState(2) // Default: 2 movies per view

    useEffect(() => {
        const updateCarouselLength = () => {
            setCarouselLength(window.innerWidth >= 768 ? 4 : 2) // 4 for large screens, 2 for small screens
        }
        updateCarouselLength()
        window.addEventListener("resize", updateCarouselLength)
        return () => window.removeEventListener("resize", updateCarouselLength)
    }, [])

    const totalMovies = movies.length

    const nextSlide = () => {
        if (index + carouselLength < totalMovies) {
            setIndex(index + carouselLength)
        } else {
            setIndex(0) // Loop back to the start
        }
    }

    const prevSlide = () => {
        if (index - carouselLength >= 0) {
            setIndex(index - carouselLength)
        } else {
            setIndex(totalMovies - carouselLength) // Go to the last batch
        }
    }

    return (
        <div className="h-full w-full">
            <div className="flex w-full flex-row items-center justify-between space-y-3 px-10 xl:px-24">
                <span className="text-base font-bold xl:text-4xl">
                    {listTitle}
                </span>
                <NavLink className="flex items-center gap-x-1.5 text-rose-700">
                    <span className="text-xs xl:text-lg">See more</span>
                    <HiOutlineChevronRight />
                </NavLink>
            </div>

            <div className="flex h-full w-full flex-row items-center">
                <div className="flex h-full flex-grow cursor-pointer flex-row items-center justify-center">
                    <HiOutlineChevronLeft
                        onClick={prevSlide}
                        color="gray"
                        className="size-1/2"
                    />
                </div>

                <div
                    className={`flex w-[calc(100%-82px)] flex-row justify-between space-x-16 xl:w-[calc(100%-192px)]`}
                >
                    {movies
                        .slice(index, index + carouselLength)
                        .map((movie, i) => (
                            <Movie movie={movie} key={i} />
                        ))}
                </div>

                <div className="h-full flex-grow">
                    <button
                        className="flex w-full cursor-pointer justify-center"
                        onClick={nextSlide}
                    >
                        <HiOutlineChevronRight
                            color="gray"
                            className="size-1/2"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieCarousel
