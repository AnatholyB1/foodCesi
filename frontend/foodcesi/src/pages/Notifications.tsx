import { cn } from "@/lib/utils";
import { ChefHat, Truck } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Notification {
    title: string;
    description: string;
    icon: JSX.Element;
    link: string;
    time: string;
    read: boolean;
}

const notifications: Notification[] = [
    {
        title: "Adrien",
        description: "Le livreur a pris en charge votre commande.",
        icon: <Truck size={32} />,
        link: "/commandes/1",
        time: "10 min",
        read: false,
    },
    {
        title: "McDonald's",
        description: "Votre commande a été approuvée",
        icon: <ChefHat size={32} />,
        link: "/commandes/1",
        time: "1 h",
        read: true,
    },
];

export default function Notifications() {
    return (
        <div className="flex flex-col items-center gap-2 p-4">
            {notifications.map((notification, index) => (
                <NavLink to={notification.link} key={index} className="w-full flex gap-4 bg-white p-4 rounded-md shadow-sm">
                    <div className="shrink-0 my-auto">{notification.icon}</div>
                    <div className="flex flex-col grow">
                        <h3 className="font-semibold text-lg">{notification.title}</h3>
                        <p className="text-grey text-sm">{notification.description}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-2 shrink-0">
                        <p className="text-grey text-xs">{notification.time}</p>
                        <div className={cn("w-2 h-2 bg-grey_light rounded-full", { "bg-primary": !notification.read })}></div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}
