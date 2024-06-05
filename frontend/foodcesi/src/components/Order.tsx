import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

export type OrderProps = {
    _id: string | number;
    image: string;
    title: string;
    description: string;
    link: string;
};

export default function Order({ image, title, description, link }: OrderProps) {
    return (
        <div className="flex w-full bg-white p-4 rounded-lg gap-3">
            <img className="w-10 h-10 rounded-full" src={image} alt="logo" width="50" height="50" />
            <div className="flex flex-col grow">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm">{description}</p>
            </div>
            <NavLink to={link}>
                <Button>Consulter</Button>
            </NavLink>
        </div>
    );
}
