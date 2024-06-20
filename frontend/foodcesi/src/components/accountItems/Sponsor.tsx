import { Handshake } from "lucide-react";
import AccountItem from "../ui/AccountItem";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";

const Sponsor = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <AccountItem title="Parrainer un ami" icon={<Handshake />} action={() => setOpen(true)} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Paraîner un ami</DialogTitle>
                    <DialogDescription>Utiliser le code suivant</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="col-span-3">
                            <input type="text" value={"5644154"} readOnly className="w-full p-2 bg-gray-100 rounded text-center" title="code de parainage" />
                        </div>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText("5644154");
                            }}
                        >
                            Copier
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="link">Retour</Button>
                    </DialogClose>
                    <Button type="submit">Valider</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Sponsor;
