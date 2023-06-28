import React from 'react'
import { ContextProvider,useStateContext } from './../context/ContextProvider';
import Home from "./../pages/Home";
import Login from "./../pages/Login";

const Index = () => {
    const {connected,setConnected}=useStateContext();
  return (
    connected?(<Home />):(<Login />)
  );
}

export default Index