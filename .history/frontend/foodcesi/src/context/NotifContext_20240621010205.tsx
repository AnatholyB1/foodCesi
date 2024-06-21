import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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

export const NotifProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
            response = await api.get(
              `/notifications/user/${user.restaurant_id}`
            );
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
    if (!user) return;

    const message: ConnectionData = {
      type: "connectionType",
      data: {
        type: user.type,
        id:
          user.type === "restaurant"
            ? user.restaurant_id!.toString()
            : user.type === "delivery"
            ? user.delivery_id!.toString()
            : user.id.toString(),
      },
    };

    ws.send(JSON.stringify(message));
  };

  ws.onmessage = (event) => {
    const dataResponse = JSON.parse(event.data.toString());
    const info = JSON.parse(dataResponse.notification.message);

    let message;

    switch (dataResponse.type) {
      case "orderRequest":
        console.log("Order request received to restaurant");
        message = {
          type: "orderResponse",
          data: {
            order_id: info.order_id,
            response: "ok",
            notification_id: dataResponse.notification._id,
          },
        };

        ws.send(JSON.stringify(message));
        console.log("Order response sent to server from restaurant");
        break;
      case "deliveryReady":
        console.log("Delivery ready received to restaurant");
        console.log("order status " + info.order.status);
        break;
      case "deliveryRequest":
        console.log("Delivery request received to delivery");
        message = {
          type: "deliveryResponse",
          data: {
            ...info,
            response: "ok",
            delivery_id: "1",
          },
        };

        ws.send(JSON.stringify(message));
        console.log("Delivery response sent to server from delivery");
        break;
      case "restaurantReady":
        console.log("Restaurant ready received to delivery");
        console.log("order status " + info.order.status);
        break;
      case "restaurantResponse":
        console.log("Restaurant response received to user");
        console.log("order status " + info.order.status);
        break;
      case "deliveryResponse":
        console.log("Delivery response received");
        console.log("order status " + info.order.status);

        message = {
          type: "restaurantReady",
          data: {
            order: info.order,
          },
        };
        ws.send(JSON.stringify(message));

        message = {
          type: "deliveryReady",
          data: {
            order: info.order,
          },
        };
        ws.send(JSON.stringify(message));

        message = {
          type: "deliveryDeparture",
          data: {
            order: info.order,
          },
        };

        ws.send(JSON.stringify(message));
        break;

      case "deliveryDeparture":
        console.log("Delivery departure received");
        console.log("order status " + info.order.status);

        ws.send(
          JSON.stringify({
            type: "deliveryArrival",
            data: {
              order: info.order,
            },
          })
        );
        break;
      case "deliveryArrival":
        console.log("Delivery arrival received");
        console.log("order status " + info.order.status);

        ws.send(
          JSON.stringify({
            type: "deliveryCompleted",
            data: {
              order: info.order,
            },
          })
        );
        break;
      case "deliveryCompleted":
        console.log("Delivery completed received");
        console.log("order status " + info.order.status);
        break;
      default:
        console.log("Unknown message");
    }

    const notification = getNotifContent(dataResponse.notification);

    setNotifications((prev) => [...prev, notification]);

    toast({ title: notification.title, description: notification.description });
  };

  const noneRead = notifications.filter((notif) => !notif.read).length > 0;

  return (
    <NotifContext.Provider
      value={{ notifications, setNotifications, noneRead }}
    >
      {children}
    </NotifContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotif = (): NotifContextType => {
  const context = useContext(NotifContext);
  if (!context) {
    throw new Error("useNotif must be used within a NotifProvider");
  }
  return context;
};
