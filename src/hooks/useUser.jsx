import { useCallback, useContext} from "react";
import Context from "../context/userContext";

export function useUser() {
    const {jwt, setJWT} = useContext(Context);
    
    const login = useCallback((data) => {
        window.localStorage.setItem('userSession', JSON.stringify(data));
        setJWT(data);
    }, [setJWT]);

    const logout = useCallback(() => {
        window.localStorage.removeItem('userSession');
        setJWT(null);
    }, [setJWT]);

    return{
        isLogged: Boolean(jwt),
        jwt,
        login,
        logout
    }
}