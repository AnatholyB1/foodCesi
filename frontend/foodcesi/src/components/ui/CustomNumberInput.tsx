import { Minus, Plus } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

interface CustomNumberInputProps {
    value: number;
    editable?: boolean;
    valueChange?: (value: number) => void;
}

const CustomNumberInput = ({ value, editable, valueChange }: CustomNumberInputProps) => {
    return (
        <div className="flex items-center bg-light rounded-full ">
            {editable && value > 0 && (
                <Button variant="ghost" size="icon" type="button" className="rounded-full w-8 h-8" onClick={() => valueChange && valueChange(value - 1)}>
                    <Minus size="16" />
                </Button>
            )}
            {value > 0 && <Input type="number" className="w-6 bg-transparent border-0 px-0 text-center disabled:opacity-1" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => valueChange && valueChange(Number(e.target.value))} disabled={!editable} />}
            {editable && (
                <Button variant="ghost" size="icon" type="button" className="rounded-full w-8 h-8" onClick={() => valueChange && valueChange(value + 1)}>
                    <Plus size="16" />
                </Button>
            )}
        </div>
    );
};

export default CustomNumberInput;
