import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Restaurant from "./pages/Restaurant";
import Commandes from "./pages/Commandes";
import Commande from "./pages/Commande";
import Compte from "./pages/Compte";
import Notifications from "./pages/Notifications";
import Recherche from "./pages/Recherche";

function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-light">
                <Header />
                <main className="grow overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/recherche" element={<Recherche />} />
                        <Route path="/commandes" element={<Commandes />} />
                        <Route path="/commandes/:id" element={<Commande />} />
                        <Route path="/restaurant/:id" element={<Restaurant />} />
                        <Route path="/compte" element={<Compte />} />
                        <Route path="/notifications" element={<Notifications />} />
                    </Routes>
                </main>
                <NavBar />
            </div>
        </Router>
    );
}

export default App;
