import Delivery from "./home/Delivery";
import Restaurant from "./home/Restaurant";
import User from "./home/User";

export default function Home() {
    const site: string = "user";

    switch (site) {
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
