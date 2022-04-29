import { useCallback, useContext} from "react";
import Context from "../context/UserContext";

export function useUser() {
    const {jwt, setJWT} = useContext(Context);
    
    const login = useCallback((data) => {
        window.localStorage.setItem('userSession', JSON.stringify(data));
        setJWT(data);
    }, [setJWT]);

    const logout = useCallback((message = '') => {
        //removemos la sesion
        window.localStorage.removeItem('userSession');
        setJWT(null);

        //enviamos mensaje
        if(message){
            window.localStorage.setItem('userMessage', message);
        }
    }, [setJWT]);

    return{
        isLogged: Boolean(jwt),
        jwt,
        login,
        logout
    }
}