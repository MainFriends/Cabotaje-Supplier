import { createContext, useState } from "react";

const Context = createContext({});

export function UserContextProvider ({children}) {
    const getJWT = JSON.parse(window.localStorage.getItem('userSession'));
    const [jwt, setJWT] = useState(getJWT);

    return <Context.Provider value={{jwt, setJWT}}>
        {children}
    </Context.Provider>
}

export default Context