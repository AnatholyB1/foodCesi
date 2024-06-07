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
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-light">
                <Header />
                <main className="grow overflow-y-auto">
                    <Routes>
                        <Route path="/connexion" element={<Login />} />
                        <Route path="/inscription" element={<Login />} />
                        <Route
                            path="/unauthorized"
                            element={
                                <RequireAuth allowedRoles={["user", "restaurant", "delivery"]}>
                                    <Unauthorized />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <RequireAuth allowedRoles={["user", "restaurant", "delivery"]}>
                                    <Home />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/recherche"
                            element={
                                <RequireAuth allowedRoles={["user"]}>
                                    <Recherche />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/commandes"
                            element={
                                <RequireAuth allowedRoles={["user", "restaurant", "delivery"]}>
                                    <Commandes />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/commandes/:id"
                            element={
                                <RequireAuth allowedRoles={["user", "restaurant", "delivery"]}>
                                    <Commande />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/restaurant/:id"
                            element={
                                <RequireAuth allowedRoles={["user", "restaurant", "delivery"]}>
                                    <Restaurant />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/compte"
                            element={
                                <RequireAuth allowedRoles={["user", "restaurant", "delivery"]}>
                                    <Compte />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/notifications"
                            element={
                                <RequireAuth allowedRoles={["user", "restaurant", "delivery"]}>
                                    <Notifications />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/panier"
                            element={
                                <RequireAuth allowedRoles={["user"]}>
                                    <Panier />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <RequireAuth allowedRoles={["user"]}>
                                    <Checkout />
                                </RequireAuth>
                            }
                        />
                    </Routes>
                </main>
                <NavBar />
            </div>
        </Router>
    );
}

export default App;
