import AccountItem from "@/components/ui/AccountItem";
import { Button } from "@/components/ui/button";
import { Handshake, LogOut, MapPin, Pencil, User } from "lucide-react";

interface Item {
    icon: JSX.Element;
    title: string;
    variant?: "default" | "primary";
}

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
    },
];

interface User {
    avatar: string;
    name: string;
    email: string;
}

const user: User = {
    avatar: "/avatars/antoine-favereau.webp",
    name: "Antoine Favereau",
    email: "antoine.favereau@gmail.com",
};

export default function Compte() {
    return (
        <div className="flex flex-col gap-8 px-4 py-2">
            <div className="flex flex-col items-center gap-2 w-full">
                <div className="relative">
                    <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full" />
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-primary p-[6px] w-8 h-8 text-white border-2">
                        <Pencil className="" />
                    </Button>
                </div>
                <p className="text-lg font-semibold">{user.name}</p>
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
