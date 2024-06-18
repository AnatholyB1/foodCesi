import { toast } from "@/components/ui/use-toast";

export const logError = (error: any) => {
    console.error(error);
    if (error.response.data.message) {
        toast({ description: error.response.data.message });
    } else {
        toast({ description: error.message });
    }
};
