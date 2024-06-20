import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import CustomCard from "./CustomCard";
import { forwardRef } from "react";

interface AccountItemProps {
    icon: JSX.Element;
    title: string;
    variant?: "default" | "primary";
    action?: () => void;
}

const AccountItem = forwardRef((props: AccountItemProps, ref: React.Ref<HTMLButtonElement>) => {
    const { variant, icon, title, action } = props;
    return (
        <CustomCard className={cn("w-full", { "bg-primary": variant === "primary" })}>
            <button ref={ref} type="button" className={cn("w-full flex items-center gap-4 p-4 text-primary", { "text-white": variant === "primary" })} onClick={action}>
                {icon}
                <p className={cn("grow text-left text-black font-semibold", { "text-white": variant === "primary" })}>{title}</p>
                <ChevronRight />
            </button>
        </CustomCard>
    );
});

export default AccountItem;
