import { NavLink } from "react-router-dom"
import {
    FaFacebookSquare,
    FaInstagram,
    FaTwitch,
    FaYoutube,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center space-y-9 border-t-2 py-12 font-bold">
            <div className="flex flex-row space-x-12">
                <FaFacebookSquare size={"24"} />
                <FaInstagram size={"24"} />
                <FaXTwitter size={"24"} />
                <FaYoutube size={"24"} />
            </div>
            <div className="flex flex-col items-center lg:flex-row lg:gap-20">
                <div>Conditions of Use</div>
                <div>Privacy & Policy</div>
                <div>Press Room</div>
            </div>
            <div className="text-gray-500">
                © 2025 RewindVHS by Abba Ali-Concern
            </div>
        </footer>
    )
}

export default Footer
