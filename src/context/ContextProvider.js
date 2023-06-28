import React, { useState, useEffect, useContext, createContext } from 'react'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const _endPoint="http://192.168.200.240:80/root/api/rva_parking/";
    //const _api = "http://192.168.100.13/root/api/rva_parking/test.php";
    const _api = _endPoint+"test.php";
    //const api = "https://tdlsoft.site/rva_statistique/api/post.php";
    //var api = "https://fin-vat.com/rva_statistique/api/post.php";
    const [hasLogged, setHasLogged] = useState(null);
    const [nomUser, setNomUser] = useState("");
    const [idUser, setIdUser] = useState(1);
    const [roleUser, setRoleUser] = useState("");
    const [connected, setConnected] = useState(false);
    const [endPoint, setEndPoint] = useState(_endPoint);
    const [api, setApi] = useState(_api);
    //const [api, setApi] = useState(api);
    useEffect(() => {

    }, [])

    return (
        <StateContext.Provider value={{ hasLogged, setHasLogged, nomUser, setNomUser,idUser,setIdUser,roleUser,setRoleUser, api,endPoint,connected, setConnected }}>
            {children}
        </StateContext.Provider>
    );

}
export const useStateContext = () => useContext(StateContext);
