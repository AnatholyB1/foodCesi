import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Props {
    icon: JSX.Element;
    title: string;
    variant?: "default" | "primary";
    action?: () => void;
}

export default function AccountItem({ variant, icon, title, action }: Props) {
    return (
        <button type="button" className={cn("w-full flex items-center gap-4 p-4 bg-white shadow-sm rounded-lg text-primary", { "bg-primary text-white": variant === "primary" })} onClick={action}>
            {icon}
            <p className={cn("grow text-left text-black font-semibold", { "text-white": variant === "primary" })}>{title}</p>
            <ChevronRight />
        </button>
    );
}
