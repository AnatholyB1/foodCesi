import { useAuth } from "@/context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";

interface Props {
    allowedRoles: string[];
    children?: React.ReactNode;
}

const RequireAuth = ({ allowedRoles, children }: Props) => {
    const { user } = useAuth();
    const location = useLocation();

    return user?.role && allowedRoles?.includes(user?.role) ? children : user ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/connexion" state={{ from: location }} replace />;
};

export default RequireAuth;
