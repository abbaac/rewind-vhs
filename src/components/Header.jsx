import SearchBar from "./SearchBar"
import Logo from "/tv.svg"
import { NavLink } from "react-router-dom"

function Header() {
    return (
        <header className="absolute flex h-14 w-full flex-row items-center justify-between border-b-2 px-4 py-3.5 text-white xl:h-20 xl:px-24 xl:py-7">
            <NavLink className="flex h-full items-center space-x-2" to={"/"}>
                <img src={Logo} className="size-full xl:size-12" />
                <span className="text-xs font-bold xl:text-2xl">RewindVHS</span>
            </NavLink>
            <SearchBar />
            <div className="hidden space-x-8 xl:block">
                <NavLink>Movies</NavLink>
                <NavLink>TV Shows</NavLink>
                <NavLink>Documentaries</NavLink>
            </div>
        </header>
    )
}

export default Header
