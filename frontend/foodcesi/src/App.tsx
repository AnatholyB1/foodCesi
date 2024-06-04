import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Restaurant from "./pages/Restaurant";
import Commandes from "./pages/Commandes";
import Commande from "./pages/Commande";

function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-light">
                <Header />
                <main className="grow overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/commandes" element={<Commandes />} />
                        <Route path="/commandes/:id" element={<Commande />} />
                        <Route path="/restaurant/:id" element={<Restaurant />} />
                    </Routes>
                </main>
                <NavBar />
            </div>
        </Router>
    );
}

export default App;
