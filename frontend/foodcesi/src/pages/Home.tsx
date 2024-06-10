import { useAuth } from "@/context/AuthContext";
import Delivery from "./home/Delivery";
import User from "./home/User";
import Restaurant from "./Restaurant";

export default function Home() {
    const { user } = useAuth();

    switch (user?.type) {
        case "user":
            return <User />;

        case "restaurant":
            return <Restaurant />;

        case "delivery":
            return <Delivery />;

        default:
            break;
    }
}
