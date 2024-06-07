import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Pas autorisé</h1>
            <br />
            <p>Vous n'avez pas le droit d'accéder à cette page.</p>
            <div className="flexGrow">
                <button type="button" onClick={goBack}>
                    Retour
                </button>
            </div>
        </section>
    );
};

export default Unauthorized;
