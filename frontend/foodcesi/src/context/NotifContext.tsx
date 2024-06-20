import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import ws from "@/helpers/websocket";

interface NotifContextType {
    notifications: Notification[];
    setNotifications: (notifications: Notification[]) => void;
    noneRead: boolean;
}

const NotifContext = createContext<NotifContextType | undefined>(undefined);

export const NotifProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    const [notifications, setNotifications] = useState<Notification[]>([]);

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

                const content = JSON.parse(data[0].message);
                console.log(data[0]);
                console.log(content);

                // data.forEach((notif: Notif) => {
                //     const content = JSON.parse(notif.message);
                //     console.log(content);
                // });

                setNotifications(data);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchNotifications();
    }, [user]);

    ws.onopen = () => {
        const message = {
            type: "connectionType",
            data: { type: user?.type, id: user?.type === "restaurant" ? user?.restaurant_id : user?.id },
        };

        ws.send(JSON.stringify(message));
    };

    ws.onmessage = (message) => {
        const data: Notif = JSON.parse(message.data);
        console.log(data);
        toast({ description: data.message });
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
