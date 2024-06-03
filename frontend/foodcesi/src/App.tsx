import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-light">
                <Header />
                <main className="grow overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
                <NavBar />
            </div>
        </Router>
    );
}

export default App;
