import { NavLink } from "react-router-dom";
import { Badge } from "./ui/badge";
import CustomCard from "./ui/CustomCard";

interface RestaurantItemProps {
    restaurant: Restaurant;
}

export default function RestaurantItem({ restaurant }: RestaurantItemProps) {
    console.log(restaurant);
    return (
        <NavLink to={`/restaurant/${restaurant.id}`}>
            <CustomCard className="min-h-full">
                <div className="flex flex-col rounded-lg overflow-hidden">
                    <img src={restaurant.banner} alt={restaurant.name} />
                    <div className="flex flex-col gap-2 bg-white p-4 pt-1">
                        <p className="text-lg font-semibold text-nowrap">{restaurant.name}</p>
                        <ul className="flex flex-wrap gap-1">
                            {restaurant.categories.map((category, index) => (
                                <li key={index}>
                                    <Badge variant="secondary">{category.name}</Badge>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CustomCard>
        </NavLink>
    );
}
