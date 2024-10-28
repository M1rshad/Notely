import { createContext, useContext, useEffect, useState } from "react";
import { is_authenticated, login } from "../Api/Api";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const get_authenticated = async () =>{
        try{
            const success = await is_authenticated();
            setIsAuthenticated(success)
        }catch{
            setIsAuthenticated(false)
        }finally{
            setLoading(false)
        }
    }

    const loginUser = async (loginCredentials, navigate, onLoginSuccess) => {
        try {
            await login(loginCredentials);
            setIsAuthenticated(true);
            if (onLoginSuccess) onLoginSuccess();
            navigate('/'); 
            return true; 
        } catch (err) {
            console.error(err);
            return false; 
        }
    };

    useEffect(()=>{
        get_authenticated()
    },[])
    console.log(isAuthenticated)
    return (

    <AuthContext.Provider value={{isAuthenticated, loading, loginUser}}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
