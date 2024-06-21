import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-3xl font-bold">Pas autorisé</h1>
            <p className="text-center">Vous n'avez pas le droit d'accéder à cette page.</p>
            <Button type="button" className="w-full" onClick={goBack}>
                Retour
            </Button>
        </div>
    );
};

export default Unauthorized;
