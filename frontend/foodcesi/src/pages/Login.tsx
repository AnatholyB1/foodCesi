import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const { user, login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (user) navigate(from, { replace: true });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            login(email, password);
            setEmail("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button type="button" onClick={handleLogin}>
                Sign In
            </button>
            <Link to="/register">Sign Up</Link>
        </>
    );
};

export default Login;
