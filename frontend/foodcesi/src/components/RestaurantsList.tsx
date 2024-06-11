import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import RestaurantItem from "./RestaurantItem";

interface Props {
    title: string;
    link: string;
    restaurants: {
        id: number;
        name: string;
        image: string;
        categories: string[];
    }[];
}

const RestaurantsList = ({ title, link, restaurants }: Props) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center w-full">
                <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
                <Link to={link}>
                    <Button variant="ghost" className="text-primary pe-0">
                        Voir Tout
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
            <Carousel className="w-full" opts={{ align: "start" }}>
                <CarouselContent>
                    {restaurants.map((restaurant, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <RestaurantItem {...restaurant} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default RestaurantsList;
