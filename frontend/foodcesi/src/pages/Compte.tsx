import Informations from "@/components/accountItems/Informations";
import Logout from "@/components/accountItems/Logout";
import Sponsor from "@/components/accountItems/Sponsor";
import AccountItem from "@/components/ui/AccountItem";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

interface Item {
    item: JSX.Element;
    types: string[];
}

const Compte = () => {
    const { user } = useAuth();

    const items: Item[] = [
        {
            item: <Informations />,
            types: ["user", "restaurant", "delivery", "commercial", "developer"],
        },
        {
            item: (
                <Link to="/addresses" className="contents">
                    <AccountItem title="Vos adresses" icon={<MapPin />} />
                </Link>
            ),
            types: ["user", "commercial"],
        },
        {
            item: <Sponsor />,
            types: ["user", "restaurant", "delivery", "commercial"],
        },
        {
            item: <Logout />,
            types: ["user", "restaurant", "delivery", "commercial", "developer"],
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
                {items.map((item, index) => {
                    if (item.types.includes(user!.type)) {
                        return (
                            <div key={index} className="contents">
                                {item.item}
                            </div>
                        );
                    }
                })}
                <Button variant="link" className="underline text-sm">
                    Supprimer le compte
                </Button>
            </div>
        </div>
    );
};

export default Compte;
