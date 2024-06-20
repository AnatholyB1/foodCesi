import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import CustomCard from "./ui/CustomCard";
import { statuses } from "@/data";

export type OrderProps = {
    order: Order;
};

export default function Order({ order }: OrderProps) {
    return (
        <CustomCard className="flex w-full p-4 gap-3">
            <img className="w-10 h-10 rounded-full" src={order.Restaurant.logo} alt="logo" width="50" height="50" />
            <div className="flex flex-col grow">
                <h3 className="font-semibold">{order.Restaurant.name}</h3>
                <p className="text-sm">{statuses.find((status) => status.key === order.status)?.text}</p>
            </div>
            <NavLink to={`/commandes/${order.id}`}>
                <Button>Consulter</Button>
            </NavLink>
        </CustomCard>
    );
}
