import { useAuth } from "@/context/AuthContext";
import AccountItem from "../ui/AccountItem";
import { LogOut } from "lucide-react";

const Logout = () => {
    const { logout } = useAuth();

    return <AccountItem title="Déconnexion" icon={<LogOut />} variant="primary" action={logout} />;
};

export default Logout;
