import CustomCard from "@/components/ui/CustomCard";
import { useNotif } from "@/context/NotifContext";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const timeDifference = (past: Date) => {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - past.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) return `${diffInDays} j`;
    if (diffInHours > 0) return `${diffInHours} h`;
    if (diffInMinutes > 0) return `${diffInMinutes} min`;
    return `${diffInSeconds} s`;
};

export default function Notifications() {
    const { notifications } = useNotif();

    return (
        <div className="flex flex-col items-center gap-2 p-4 max-w-lg mx-auto">
            {notifications.map((notification, index) => (
                <CustomCard className="w-full" key={index}>
                    <NavLink to={notification.link} className="w-full flex gap-4 p-4">
                        <div className="shrink-0 my-auto">{notification.icon}</div>
                        <div className="flex flex-col grow">
                            <h3 className="font-semibold text-lg">{notification.title}</h3>
                            <p className="text-grey text-sm">{notification.description}</p>
                        </div>
                        <div className="flex flex-col justify-between items-end gap-2 shrink-0">
                            <p className="text-grey text-xs">{timeDifference(new Date(notification.createdAt))}</p>
                            <div className={cn("w-2 h-2 bg-grey_light rounded-full", { "bg-primary": !notification.read })}></div>
                        </div>
                    </NavLink>
                </CustomCard>
            ))}
        </div>
    );
}
