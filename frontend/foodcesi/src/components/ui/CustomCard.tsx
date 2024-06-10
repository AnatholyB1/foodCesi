import { cn } from "@/lib/utils";
import React from "react";

interface CustomCardProps {
    props?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
    children: React.ReactNode;
}

const CustomCard = ({ props, className, children }: CustomCardProps) => {
    return (
        <div className={cn("bg-white rounded-lg shadow-sm", className)} {...props}>
            {children}
        </div>
    );
};

export default CustomCard;
