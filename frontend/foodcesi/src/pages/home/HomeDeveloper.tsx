import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomeDeveloper() {
    const { user } = useAuth();

    const [key, setKey] = useState(null);
    const [idKey, setIdKey] = useState(null);

    useEffect(() => {
        axios.get(`/api/devs/user/${user?.id}`).then((res) => {
            console.log(res)
            const cle = res?.data[0]?.apiKey;
            const id = res?.data[0]?.id;
            setKey(cle);
            setIdKey(id);
        });
    }, [key, user?.id]);

    const onClickCreateKey = () => {
        axios
            .post("/api/devs", { user_id: user?.id, appName: user?.username })
            .then((res) => {
                const cle = res?.data?.apiKey;
                const id = res?.data?.id;
                setKey(cle);
                setIdKey(id);
                
            });

        return undefined;
    };

    const onClickDeleteKey = () => {
        axios
            .delete(`/api/devs/${idKey}`)
            .then(() => {
                setKey(null);
                setIdKey(null);
            });

        return undefined;
    }

    if (!key) {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-lg font-semibold text-nowrap">
                    Vous n'avez pas encore de clé de sécurité ?
                </h1>
                <Button onClick={onClickCreateKey}>Faire la demande</Button>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <h2>Clé : {key} </h2>
                <Button variant="link" className="underline" onClick={onClickDeleteKey}>
                    Supprimer la clé
                </Button>
                <a href="/api/api-docs/" target="_blank" rel="noopener noreferrer">
                        <Button>Consulter la documentation</Button>
                    </a>
            </div>
        );
    }
}
