import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
// import { BarChart } from "@mui/x-charts/BarChart";

// const droits = [
//     { id: 1, name: "rggsegsge" },
//     { id: 2, name: "Travail" },
// ];

export default function Developer() {
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
    }, [key]);

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

    // const [selectedDroit, setSelectedDroit] = useState(droits[0]);

    if (!key) {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-lg font-semibold text-nowrap">
                    Vous n'avez pas encore de clé de sécurité ?
                </h1>
                {/* Sélectionner vos droits :
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="white"
                            className="flex items-center justify-center gap-2 px-0 text-grey"
                        >
                            <span>{selectedDroit.name}</span>
                            <ChevronDown size="16" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuRadioGroup
                            value={selectedDroit.name}
                            onValueChange={(value) =>
                                setSelectedDroit(
                                    droits.find(
                                        (address) => address.name === value
                                    ) || selectedDroit
                                )
                            }
                        >
                            {droits.map((droit, index) => (
                                <DropdownMenuRadioItem
                                    key={index}
                                    value={droit.name}
                                >
                                    {droit.name}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu> */}
                <Button onClick={onClickCreateKey}>Faire la demande</Button>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                {/* <h2>Autorisation : Admin</h2> */}
                <h2>Clé : {key} </h2>
                <Button variant="link" className="underline" onClick={onClickDeleteKey}>
                    Supprimer la clé
                </Button>
                <Button>Consulter la documentation</Button>
                <h2>Utilisation ces derniers mois :</h2>
                {/* <BarChart
                    series={[
                        { data: [35, 44, 24, 34] },
                        { data: [51, 6, 49, 30] },
                        { data: [15, 25, 30, 50] },
                        { data: [60, 50, 15, 25] },
                    ]}
                    height={290}
                    xAxis={[
                        { data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" },
                    ]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                /> */}
            </div>
        );
    }
}
