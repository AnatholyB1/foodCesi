import { useAuth } from "@/context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";

interface Props {
    allowedTypes: string[];
    children?: React.ReactNode;
}

const RequireAuth = ({ allowedTypes, children }: Props) => {
    const { user } = useAuth();
    const location = useLocation();

    return user?.type && allowedTypes?.includes(user?.type) ? children : user ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/authentification" state={{ from: location }} replace />;
};

export default RequireAuth;
