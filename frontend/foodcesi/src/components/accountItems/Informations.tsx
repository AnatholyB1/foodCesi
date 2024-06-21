import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import AccountItem from "../ui/AccountItem";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import api from "@/helpers/api";
import { toast } from "../ui/use-toast";

const Informations = () => {
    const { user, setUser } = useAuth();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const username: string = event.currentTarget.username.value;

        try {
            const response = await api.patch(`/users/${user?.id}`, { username });
            setUser({ ...response.data });
            sessionStorage.setItem("user", JSON.stringify({ ...response.data }));
            toast({ description: "Informations mises à jour" });
            setOpen(false);
        } catch (error: any) {
            console.log(error);
            toast({ description: error.response.data.message });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <AccountItem title="Vos informations" icon={<User />} action={() => setOpen(true)} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form className="contents" onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier les informations</DialogTitle>
                        <DialogDescription>Modifier les informations</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Nom d'utilisateur
                            </Label>
                            <Input id="username" defaultValue={user?.username} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="link">Retour</Button>
                        </DialogClose>
                        <Button type="submit">Valider</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Informations;
