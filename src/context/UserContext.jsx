import { createContext, useState } from "react";

export function UserContextProvider ({children}) {
    const Context = createContext({});
    const getJWT = JSON.parse(window.localStorage.getItem('userSession'));
    const [jwt, setJWT] = useState(getJWT);

    return <Context.Provider value={{jwt, setJWT}}>
        {children}
    </Context.Provider>
}

export default Context