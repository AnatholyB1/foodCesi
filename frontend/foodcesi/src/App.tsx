import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Restaurant from "./pages/Restaurant";
import Commandes from "./pages/Commandes";
import Commande from "./pages/Commande";
import Compte from "./pages/Compte";
import Notifications from "./pages/Notifications";
import Recherche from "./pages/Recherche";
import Panier from "./pages/Panier";
import Checkout from "./pages/Checkout";
import Unauthorized from "./pages/Unauthorized";
import Authentification from "./pages/Authentification";
import Stats from "./pages/Stats";
import { Toaster } from "./components/ui/toaster";
import Addresses from "./pages/Addresses";
import Parameters from "./pages/Parameters";

function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-light">
                <Header />
                <main className="grow overflow-y-auto">
                    <div className="h-full mx-auto max-w-6xl">
                        <Routes>
                            <Route path="/authentification" element={<Authentification />} />
                            <Route
                                path="/unauthorized"
                                element={
                                    <RequireAuth allowedTypes={["user", "restaurant", "delivery", "commercial", "developer"]}>
                                        <Unauthorized />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <RequireAuth allowedTypes={["user", "restaurant", "delivery", "commercial", "developer"]}>
                                        <Home />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/recherche"
                                element={
                                    <RequireAuth allowedTypes={["user", "commercial"]}>
                                        <Recherche />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/commandes"
                                element={
                                    <RequireAuth allowedTypes={["user", "restaurant", "delivery", "commercial"]}>
                                        <Commandes />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/commandes/:id"
                                element={
                                    <RequireAuth allowedTypes={["user", "restaurant", "delivery", "commercial"]}>
                                        <Commande />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/restaurant/:id"
                                element={
                                    <RequireAuth allowedTypes={["user", "restaurant", "delivery", "commercial"]}>
                                        <Restaurant />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/statistiques"
                                element={
                                    <RequireAuth allowedTypes={["restaurant"]}>
                                        <Stats />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/compte"
                                element={
                                    <RequireAuth allowedTypes={["user", "restaurant", "delivery", "commercial", "developer"]}>
                                        <Compte />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/addresses"
                                element={
                                    <RequireAuth allowedTypes={["user", "commercial"]}>
                                        <Addresses />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/notifications"
                                element={
                                    <RequireAuth allowedTypes={["user", "restaurant", "delivery", "commercial"]}>
                                        <Notifications />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/panier"
                                element={
                                    <RequireAuth allowedTypes={["user", "commercial"]}>
                                        <Panier />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/checkout"
                                element={
                                    <RequireAuth allowedTypes={["user", "commercial"]}>
                                        <Checkout />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/parametres"
                                element={
                                    <RequireAuth allowedTypes={["user", "restaurant", "delivery", "commercial", "developer"]}>
                                        <Parameters />
                                    </RequireAuth>
                                }
                            />
                        </Routes>
                    </div>
                </main>
                <Toaster />
                <NavBar />
            </div>
        </Router>
    );
}

export default App;
