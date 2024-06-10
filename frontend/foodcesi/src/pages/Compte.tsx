import AccountItem from "@/components/ui/AccountItem";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Handshake, LogOut, MapPin, Pencil, User } from "lucide-react";

interface Item {
    icon: JSX.Element;
    title: string;
    variant?: "default" | "primary";
    action?: () => void;
}

interface User {
    avatar: string;
    name: string;
    email: string;
}

const fakeUser: User = {
    avatar: "/avatars/antoine-favereau.webp",
    name: "Antoine Favereau",
    email: "antoine.favereau@gmail.com",
};

export default function Compte() {
    const { logout } = useAuth();

    const items: Item[] = [
        {
            icon: <User />,
            title: "Vos informations",
        },
        {
            icon: <MapPin />,
            title: "Vos adresses",
        },
        {
            icon: <Handshake />,
            title: "Parrainer un ami",
        },
        {
            icon: <LogOut />,
            title: "Déconnexion",
            variant: "primary",
            action: logout,
        },
    ];

    return (
        <div className="flex flex-col gap-8 px-4 py-2 max-w-lg mx-auto">
            <div className="flex flex-col items-center gap-2 w-full">
                <div className="relative">
                    <img src={fakeUser.avatar} alt="avatar" className="w-20 h-20 rounded-full" />
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-primary p-[6px] w-8 h-8 text-white border-2">
                        <Pencil className="" />
                    </Button>
                </div>
                <p className="text-lg font-semibold">{fakeUser.name}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                {items.map((item, index) => (
                    <AccountItem key={index} {...item} />
                ))}
                <Button variant="link" className="underline text-sm">
                    Supprimer le compte
                </Button>
            </div>
        </div>
    );
}
