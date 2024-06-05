import { NavLink } from "react-router-dom";
import { Badge } from "./ui/badge";

interface Props {
    id: number;
    name: string;
    image: string;
    categories: string[];
}

export default function RestaurantItem({ id, name, image, categories }: Props) {
    return (
        <NavLink to={`/restaurant/${id}`} className="rounded-lg shadow-sm">
            <div className="flex flex-col bg-white rounded-lg overflow-hidden">
                <img src={image} alt={name} />
                <div className="flex flex-col gap-2 bg-white p-4 pt-1">
                    <p className="text-lg font-semibold text-nowrap">{name}</p>
                    <ul className="flex flex-wrap gap-1">
                        {categories.map((category) => (
                            <li key={category}>
                                <Badge variant="secondary">{category}</Badge>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </NavLink>
    );
}
