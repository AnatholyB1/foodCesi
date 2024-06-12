import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, UnderlinedTabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Authentification = () => {
    const { user, login, register } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [activeTab, setActiveTab] = useState("login");

    if (user) navigate(from, { replace: true });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [type, setType] = useState("user");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(email, password);
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        register(email, password, username, type);
    };

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-2xl font-bold py-8">
                Bienvenue sur <span className="text-primary">CESI Eats</span>
            </h1>

            <Tabs className="w-full flex flex-col items-center gap-4" value={activeTab} onValueChange={(value: string) => setActiveTab(value)}>
                <TabsList className="grid grid-cols-2 bg-transparent shadow-none">
                    <UnderlinedTabsTrigger value="login">Connexion</UnderlinedTabsTrigger>
                    <UnderlinedTabsTrigger value="register">Inscription</UnderlinedTabsTrigger>
                </TabsList>
                <TabsContent value="login" className="mt-0">
                    <div className="w-full flex flex-col items-center gap-2">
                        <form className="w-full flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm" onSubmit={handleLogin}>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email" className="text-grey">
                                    Email
                                </Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="password" className="text-grey">
                                    Mot de passe
                                </Label>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="mot de passe" />
                            </div>
                            <Button type="submit">Connexion</Button>
                        </form>
                        <p className="font-medium">
                            Pas encore de compte ?{" "}
                            <Button variant="link" className="p-0 text-primary underline h-auto" onClick={() => setActiveTab("register")}>
                                Inscription
                            </Button>
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="register" className="mt-0">
                    <div className="w-full flex flex-col items-center gap-2">
                        <form className="w-full flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm" onSubmit={handleRegister}>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email" className="text-grey">
                                    Email
                                </Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="password" className="text-grey">
                                    Mot de passe
                                </Label>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="mot de passe" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="username" className="text-grey">
                                    Nom d'utilisateur
                                </Label>
                                <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="type" className="text-grey">
                                    Rôle
                                </Label>
                                <Select value={type} onValueChange={(value) => setType(value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">Utilisateur</SelectItem>
                                        <SelectItem value="restaurant">Restaurateur</SelectItem>
                                        <SelectItem value="delivery">Livreur</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit">Inscription</Button>
                        </form>
                        <p className="font-medium">
                            Déjà un compte ?{" "}
                            <Button variant="link" className="p-0 text-primary underline h-auto" onClick={() => setActiveTab("login")}>
                                Connexion
                            </Button>
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Authentification;
