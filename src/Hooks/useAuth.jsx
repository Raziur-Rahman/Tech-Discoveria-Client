import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuth = () => {
    const authProv = useContext(AuthContext);
    return authProv;
    
};

export default useAuth;