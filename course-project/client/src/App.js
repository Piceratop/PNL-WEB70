import { Routes, Route } from "react-router-dom";
import { NavBar } from "./layout/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
            </Routes>
        </div>
    );
}

export default App;
