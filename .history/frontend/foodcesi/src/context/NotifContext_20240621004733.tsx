import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import ws from "@/helpers/websocket";
import { ChefHat, CircleHelp, Truck, User } from "lucide-react";

interface NotifContextType {
    notifications: NotificationType[];
    setNotifications: (notifications: NotificationType[]) => void;
    noneRead: boolean;
}

const NotifContext = createContext<NotifContextType | undefined>(undefined);

const getNotifContent = (data: NotifContent) => {
    const notification: NotificationType = {
        _id: data._id || "",
        icon: <></>,
        title: "",
        description: "",
        link: "",
        createdAt: data.createdAt,
        read: data.read,
    };

    const content = JSON.parse(data.message);

    switch (data.from) {
        case "user":
            notification.title = "Client";
            notification.icon = <User size={32} />;
            break;
        case "delivery":
            notification.title = "Livreur";
            notification.icon = <Truck size={32} />;
            break;
        case "restaurant":
            notification.title = "Restaurant";
            notification.icon = <ChefHat size={32} />;
            break;
        default:
            notification.title = "???";
            notification.icon = <CircleHelp size={32} />;
            break;
    }

    switch (data.type) {
        case "orderRequest":
            notification.description = `Nouvelle commande.`;
            notification.link = `/commandes/${content.order_id}`;
            break;
        case "restaurantResponse":
            notification.description = `Prise en charge de votre commande.`;
            notification.link = `/commandes/${content.order_id}`;
            break;
        default:
            notification.description = "???";
            break;
    }

    return notification;
};

export const NotifProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return;
            try {
                let response;
                switch (user?.type) {
                    case "restaurant":
                        if (user.restaurant_id === undefined) return;
                        response = await api.get(`/notifications/user/${user.restaurant_id}`);
                        break;
                    case "delivery":
                        if (user.delivery_id === undefined) return;
                        response = await api.get(`/notifications/user/${user.delivery_id}`);
                        break;
                    default:
                        response = await api.get(`notifications/user/${user.id}`);
                        break;
                }

                if (response.status !== 200) {
                    toast({ description: "Echec de la récupération des notifications" });
                    return;
                }

                const data = response.data;

                if (!data) {
                    toast({ description: "Echec de la récupération des notifications" });
                    return;
                }
                const newNotifications: NotificationType[] = [];

                data.map((notif: NotifContent) => {
                    try {
                        newNotifications.push(getNotifContent(notif));
                    } catch (error: any) {
                        logError(error);
                    }
                });


                setNotifications(newNotifications);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchNotifications();
    }, [user]);

    ws.onopen = () => {

        if (!user || !user.restaurant_id || !user.delivery_id) return;

        const message : ConnectionData = {
            type: "connectionType",
            data: { 
                type: user.type, 
                id: user.type === "restaurant" ? user.restaurant_id.toString() : 
                    user.type === "delivery" ? user.delivery_id.toString() : 
                    user.id.toString() 
            }
            }

        ws.send(JSON.stringify(message));
    };

    ws.onmessage = (message) => {
        const data: Notif = JSON.parse(message.data);

        const notification = getNotifContent(data.notification);

        setNotifications((prev) => [...prev, notification]);

        toast({ title: notification.title, description: notification.description });
    };

    const noneRead = notifications.filter((notif) => !notif.read).length > 0;

    return <NotifContext.Provider value={{ notifications, setNotifications, noneRead }}>{children}</NotifContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotif = (): NotifContextType => {
    const context = useContext(NotifContext);
    if (!context) {
        throw new Error("useNotif must be used within a NotifProvider");
    }
    return context;
};
