import Informations from "@/components/accountItems/Informations";
import Logout from "@/components/accountItems/Logout";
import AccountItem from "@/components/ui/AccountItem";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Handshake, MapPin, Pencil } from "lucide-react";

interface Item {
    icon: JSX.Element;
    title: string;
    variant?: "default" | "primary";
    action?: () => void;
}

export default function Compte() {
    const { user } = useAuth();

    const items: Item[] = [
        {
            icon: <MapPin />,
            title: "Vos adresses",
        },
        {
            icon: <Handshake />,
            title: "Parrainer un ami",
        },
    ];

    return (
        <div className="flex flex-col gap-8 px-4 py-2 max-w-lg mx-auto">
            <div className="flex flex-col items-center gap-2 w-full">
                <div className="relative">
                    <img src="/avatars/antoine-favereau.webp" alt="avatar" className="w-20 h-20 rounded-full" />
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-primary p-[6px] w-8 h-8 text-white border-2">
                        <Pencil />
                    </Button>
                </div>
                <p className="text-lg font-semibold">{user?.username}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Informations />
                {items.map((item, index) => (
                    <AccountItem key={index} {...item} />
                ))}
                <Logout />
                <Button variant="link" className="underline text-sm">
                    Supprimer le compte
                </Button>
            </div>
        </div>
    );
}
