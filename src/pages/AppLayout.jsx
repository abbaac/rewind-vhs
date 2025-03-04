import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

function AppLayout() {
    return (
        <div className="w-vw">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout
