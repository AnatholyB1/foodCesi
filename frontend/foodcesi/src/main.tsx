import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { NotifProvider } from "./context/NotifContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <NotifProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </NotifProvider>
        </AuthProvider>
    </React.StrictMode>
);
