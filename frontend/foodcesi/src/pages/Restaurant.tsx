// import { useParams } from "react-router-dom";

export default function Restaurant() {
    // const { id } = useParams();

    const restaurant = { id: 1, name: "McDonald's", image: "mcdonalds.jpg", avatar: "mdconalds.jpg", items: [] };

    const backgroundImagePath = "/restaurantImages/";
    const avatarImagePath = "/avatars/";

    return (
        <>
            <div className="flex flex-col items-center py-2 px-4">
                <img className="w-full h-auto rounded-2xl aspect-[3/1] object-cover" src={backgroundImagePath + restaurant.image} width="400" height="400" alt={restaurant.name} />
                <div className="flex flex-col items-center -mt-10">
                    <img className="rounded-full border-4 border-white" src={avatarImagePath + restaurant.avatar} width="72" height="72" alt={restaurant.name} />
                    <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                </div>
            </div>
            <div className="flex flex-col gap-8 py-4 px-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Menus</h3>
                    <div className="flex flex-col gap-2"></div>
                </div>
            </div>
        </>
    );
}
