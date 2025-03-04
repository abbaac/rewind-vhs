// import { NavLink } from "react-router-dom"
// import { HiOutlineChevronRight } from "react-icons/hi2"
// import { HiOutlineChevronLeft } from "react-icons/hi2"
// import { useState } from "react"
// import Movie from "./Movie"

// function MovieCarousel({ listTitle, movies }) {
//     const [index, setIndex] = useState(0)
//     const totalLength = movies.length
//     const carouselLength = 4

//     const nextSlide = () => {
//         setIndex((prev) => (prev + 1) % totalLength)
//     }

//     const prevSlide = () => {
//         setIndex((prev) => (prev - 1 + totalLength) % totalLength)
//     }

//     const getDisplayedMovies = () => {
//         if (index + carouselLength <= totalLength) {
//             return movies.slice(index, index + carouselLength)
//         } else {
//             // Wrap around when reaching the end
//             return [
//                 ...movies.slice(index, totalLength),
//                 ...movies.slice(0, (index + carouselLength) % totalLength),
//             ]
//         }
//     }

//     return (
//         <div className="w-full">
//             <div className="flex flex-row items-end justify-between px-4 xl:px-24">
//                 <span className="text-base font-bold xl:text-4xl">
//                     {listTitle}
//                 </span>
//                 <NavLink className="flex items-center gap-x-1.5 text-rose-700">
//                     <span className="text-xs xl:text-lg">See more</span>
//                     <HiOutlineChevronRight />
//                 </NavLink>
//             </div>
//             <div className="flex flex-row items-center justify-between space-x-3 px-9">
//                 <button className="cursor-pointer" onClick={prevSlide}>
//                     <HiOutlineChevronLeft size={"48"} color="gray" />
//                 </button>
//                 <div
//                     className={`flex w-full flex-row gap-[calc((100%-90px*2)/3)] py-4 xl:gap-[calc((100%-256px*4)/3)]`}
//                     // style={{
//                     //     gap: `xl: calc((100% - (256px * 4)) / 3); calc((100% - (256px * 4)) / 3)`,
//                     // }}
//                 >
//                     {getDisplayedMovies().map((movie) => (
//                         <Movie movie={movie} key={movie} />
//                     ))}
//                 </div>
//                 <button className="cursor-pointer" onClick={nextSlide}>
//                     <HiOutlineChevronRight size={"48"} color="gray" />
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default MovieCarousel

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
