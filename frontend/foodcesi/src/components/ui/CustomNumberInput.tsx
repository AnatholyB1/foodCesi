import { Minus, Plus } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

interface CustomNumberInputProps {
    quantity: number;
    quantityChange?: (value: number) => void;
}

const CustomNumberInput = ({ quantity, quantityChange }: CustomNumberInputProps) => {
    return (
        <div className="flex items-center bg-light rounded-full ">
            {quantityChange && quantity > 0 && (
                <Button variant="ghost" size="icon" type="button" className="rounded-full w-8 h-8" onClick={() => quantityChange(quantity - 1)}>
                    <Minus size="16" />
                </Button>
            )}
            {quantity > 0 && <Input type="number" className="w-6 bg-transparent border-0 px-0 text-center disabled:opacity-1" value={quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => quantityChange && quantityChange(Number(e.target.value))} disabled={!quantityChange} />}
            {quantityChange && (
                <Button variant="ghost" size="icon" type="button" className="rounded-full w-8 h-8" onClick={() => quantityChange(quantity + 1)}>
                    <Plus size="16" />
                </Button>
            )}
        </div>
    );
};

export default CustomNumberInput;
