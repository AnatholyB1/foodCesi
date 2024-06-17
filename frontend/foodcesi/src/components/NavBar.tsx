import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { BarChartBig, Home, NotepadText, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const NavItems = [
    { name: "Accueil", path: "/", icon: <Home />, types: ["user", "restaurant", "delivery", "developer"] },
    { name: "Recherche", path: "/recherche", icon: <Search />, types: ["user"] },
    { name: "Commandes", path: "/commandes", icon: <NotepadText />, types: ["user", "restaurant"] },
    { name: "Statistiques", path: "/statistiques", icon: <BarChartBig />, types: ["restaurant"] },
    { name: "Compte", path: "/compte", icon: <User />, types: ["user", "restaurant", "delivery", "developer"] },
];

export default function NavBar() {
    const { user } = useAuth();

    if (!user) {
        return;
    }
    return (
        <nav className="bg-white shadow-md shadow-black p-3">
            <ul className="flex justify-evenly text-xs">
                {NavItems.map(
                    (item) =>
                        item.types.includes(user.type) && (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        cn("flex flex-col items-center w-16", {
                                            "text-black": isActive,
                                            "text-grey": !isActive,
                                        })
                                    }
                                >
                                    {item.icon}
                                    <p>{item.name}</p>
                                </NavLink>
                            </li>
                        )
                )}
            </ul>
        </nav>
    );
}
