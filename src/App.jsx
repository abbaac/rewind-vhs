import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppLayout from "./pages/AppLayout"
import Homepage from "./pages/Homepage"
import MoviePreview from "./pages/MoviePreview"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/content/:id" element={<MoviePreview />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
