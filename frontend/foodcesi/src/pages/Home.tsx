import { useAuth } from "@/context/AuthContext";
import HomeUser from "./home/HomeUser";
import HomeRestaurant from "./home/HomeRestaurant";
import HomeDeveloper from "./home/HomeDeveloper";
import HomeDelivery from "./home/HomeDelivery";

export default function Home() {
    const { user } = useAuth();

    switch (user?.type) {
        case "user":
            return <HomeUser />;

        case "restaurant":
            return <HomeRestaurant />;

        case "delivery":
            return <HomeDelivery />;

        case "developer":
            return <HomeDeveloper />;

        case "commercial":
            return <HomeUser />;

        default:
            break;
    }
}
