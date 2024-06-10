import { NavLink } from "react-router-dom";
import { Badge } from "./ui/badge";
import CustomCard from "./ui/CustomCard";

interface Props {
    id: number;
    name: string;
    image: string;
    categories: string[];
}

export default function RestaurantItem({ id, name, image, categories }: Props) {
    return (
        <NavLink to={`/restaurant/${id}`}>
            <CustomCard>
                <div className="flex flex-col rounded-lg overflow-hidden">
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
            </CustomCard>
        </NavLink>
    );
}
