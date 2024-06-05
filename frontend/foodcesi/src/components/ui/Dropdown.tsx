import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    icon: string;
    title: string;
    defaultOpen?: boolean;
    children: JSX.Element;
}

export default function Dropdown({ icon, title, defaultOpen, children }: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="rounded-lg bg-white shadow-sm">
            <button type="button" className="flex items-center gap-4 w-full p-4" onClick={toggleDropdown}>
                <img className="w-10 h-10 rounded-full" src={icon} alt="icon" width="50" height="50" />
                <p className="grow text-left text-lg font-bold">{title}</p>
                <ChevronDown className={cn("transition-transform", { "rotate-180": isOpen })} />
            </button>
            <div className={cn("w-full rounded-lg overflow-hidden", { hidden: !isOpen })}>{children}</div>
        </div>
    );
}
