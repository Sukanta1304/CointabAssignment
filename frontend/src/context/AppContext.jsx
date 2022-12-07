import { createContext, useState } from "react";


export const AppContext= createContext();

const AppContextProvider=({children})=>{
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState('');
    return(
        <AppContext.Provider value={{isAuth,setIsAuth,user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;