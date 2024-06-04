import { Minus, Plus } from "lucide-react";

interface Props {
    icon: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    editable?: boolean;
}

export default function FoodItem({ icon, title, description, price, quantity, editable }: Props) {
    return (
        <div className="flex w-full bg-white p-4 gap-3 border-t-2 border-light">
            <img className="w-12 h-12 shrink-0" src={icon} alt="logo" width="50" height="50" />
            <div className="flex flex-col grow">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-xs text-grey">{description}</p>
            </div>
            <div className="flex flex-col justify-between items-end gap-4 shrink-0">
                <p className="text-lg font-bold">{price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
                <div className="flex items-center rounded-full bg-light px-2 py-1 gap-1 shrink-0">
                    {editable && <Minus className="w-4 h-4" />}
                    <span className="px-1">{quantity}</span>
                    {editable && <Plus className="w-4 h-4" />}
                </div>
            </div>
        </div>
    );
}
