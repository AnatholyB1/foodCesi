import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Parameters = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col gap-4 p-4">
            {user?.type === "commercial" && (
                <div className="flex items-center gap-2">
                    <p>Lien vers la page admin : </p>
                    <Link to={`http://${window.location.hostname}:5000`}>
                        <Button>Page admin</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Parameters;
