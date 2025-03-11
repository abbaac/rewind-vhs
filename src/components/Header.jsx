import SearchBar from "./SearchBar"
import Logo from "/tv.svg"
import { NavLink } from "react-router-dom"

function Header() {
    return (
        <header className="absolute flex h-14 w-full flex-row items-center justify-between border-b-2 px-4 py-3.5 text-white md:px-6 lg:px-12 lg:py-3.5 xl:h-20">
            <NavLink className="flex h-full items-center space-x-2" to={"/"}>
                <img src={Logo} className="size-full xl:size-12" />
                <span className="text-xs font-bold md:text-base xl:text-2xl">
                    RewindVHS
                </span>
            </NavLink>
            <SearchBar />
            <div className="hidden space-x-4 lg:block">
                <NavLink>Movies</NavLink>
                <NavLink>TV Shows</NavLink>
                <NavLink>Documentaries</NavLink>
            </div>
        </header>
    )
}

export default Header
