import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, BellDot, Settings, ShoppingCart } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const previousLocationRef = useRef<typeof location | null>(null);
    const hasNotification = false;

    // Stockez l'adresse précédente
    useEffect(() => {
        previousLocationRef.current = location;
    }, [location]);

    if (!user) {
        return;
    }

    const title = location.pathname.split("/")[1];

    const handleBackClick = () => {
        if (previousLocationRef.current) {
            navigate(-1); // Naviguer à l'adresse précédente
        }
    };

    return (
        <header className="flex justify-between items-center px-4 py-5">
            {title ? (
                <div className="flex items-center gap-3">
                    <button type="button" onClick={handleBackClick} title="Retour">
                        <ArrowLeft />
                    </button>
                    <h1 className="text-xl font-medium capitalize">{title}</h1>
                </div>
            ) : (
                <>
                    <NavLink to="/parametres">
                        <Settings />
                    </NavLink>
                    <img className="h-8 w-auto" src="/logo_inline.png" alt="" />
                </>
            )}
            <div className="flex gap-3">
                <NavLink to="/notifications">{hasNotification ? <BellDot /> : <Bell />}</NavLink>
                {user.type === "user" && (
                    <NavLink to="/panier">
                        <ShoppingCart />
                    </NavLink>
                )}
            </div>
        </header>
    );
}
