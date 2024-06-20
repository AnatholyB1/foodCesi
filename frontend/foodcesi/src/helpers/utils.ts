import { toast } from "@/components/ui/use-toast";

export const logError = (error: any) => {
    console.error(error);
    toast({ description: error.response?.data?.message || error.response?.statusText || error.message || error });
};
