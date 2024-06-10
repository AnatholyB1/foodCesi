import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Home, NotepadText, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const NavItems = [
    { name: "Accueil", path: "/", icon: <Home /> },
    { name: "Recherche", path: "/recherche", icon: <Search /> },
    { name: "Commandes", path: "/commandes", icon: <NotepadText /> },
    { name: "Compte", path: "/compte", icon: <User /> },
];

export default function NavBar() {
    return (
        <nav className="bg-white shadow-md shadow-black p-3">
            <ul className="flex justify-evenly text-xs">
                {NavItems.map((item) => (
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
                ))}
            </ul>
        </nav>
    );
}
