import React,{useEffect} from "react";
import Sidebar from "./../components/Sidebar";
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import {useStateContext} from './../context/ContextProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./../pages/Dashboard";
import Encaissement from "./../pages/Encaissement";
import Encaissementmanuel from "./../pages/Encaissementmanuel";
import Entreevehicule from "./../pages/Entreevehicule";
import Sortievehicule from "./../pages/Sortievehicule";
import Ticketoffline from "./../pages/Ticketoffline";
import RapportEncaissementParJour from "./../pages/RapportEncaissementParJour";
import Vehiculestationne from "./../pages/Vehiculestationne";
import Tarif from "./../pages/Tarif";
import Recherche from "./../pages/Recherche";
import Rapportglobal from "./../pages/Rapportglobal";
import RapportglobalDetail from "./../pages/RapportglobalDetail";
import Recettecaissier from "./../pages/Recettecaissier";
import Utilisateur from "./../pages/Utilisateur";
import Reinit from "./../pages/Reinit";
import Mouvements from "./../pages/Mouvements";
import Taux from "./../pages/Taux";
import Journal from "./../pages/Journal";
import EncaissementScanner from "./../pages/EncaissementScanner";

const Home=()=> {
  const {api,connected}=useStateContext();
  useEffect(()=>{
    //alert(connected);
  },[]);
  return (
    <BrowserRouter>
    <div className="flex flex-row h-screen">
      <div className="bg-blue-500 w-72 h-full overflow-visible">
        <Sidebar />
      </div>
      <div className="bg-gray-300 w-full border-r-4 border-red-500 h-full flex flex-col">
        <div className="bg-blue-500 w-auto text-white">
          <Navbar />
        </div>
        <div className="p-2 overflow-scroll h-full">
          <div className="">
          
          <Routes>
            {/*<Route path="/" element={"sds"}>
              <Route path="/encaissement" element={'sds'} />
              <Route path="tasks" element={'sds'} />
            </Route>*/}
            <Route path="/" element={<Dashboard  />} />
            <Route path="/encaissement" element={<Encaissement />} />
            <Route path="/encaissementScanner" element={<EncaissementScanner />} />
            <Route path="/encaissementmanuel" element={<Encaissementmanuel />} />
            <Route path="/entreevehicule" element={<Entreevehicule />} />
            <Route path="/sortievehicule" element={<Sortievehicule />} />
            <Route path="/encaissementdujour" element={<RapportEncaissementParJour />} />
            <Route path="/rapportticketoffline" element={<Ticketoffline />} />
            <Route path="/rapportglobal" element={<Rapportglobal />} />
            <Route path="/rapportglobaldetail" element={<RapportglobalDetail />} />
            <Route path="/recettecaissier" element={<Recettecaissier />} />
            <Route path="/vehiculestationne" element={<Vehiculestationne />} />
            <Route path="/utilisateur" element={<Utilisateur />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/Reinit" element={<Reinit />} />
            <Route path="/Mouvements" element={<Mouvements />} />
            <Route path="/recherche" element={<Recherche />}>
              <Route path=":id" element={<Taux />} />
            </Route>
            <Route path="/taux" element={<Taux />} />
            <Route path="/tarification" element={<Tarif />} />
            <Route path="/test" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
          </div>
        </div>
      </div>
        {/*<div className="fixed">
          <Navbar />
        </div>
        <div className="fixed clear w">
          <div className="flex flex-row bg-gray-200">
            <div className="h-screen w-[80px] bg-white border-r">
              <Sidebar />
            </div>
            <div className="flex-1 border-r-2 border-orange-500">
              <Wrapper />
            </div>
          </div>
        </div>
        <div className="flex flex-row overflow-hidden">
          <div className="w-50 h-screen fixed">
              <Sidebar />
          </div>
          <div className="w-full fixed ml-64 h-screen bg-gray-200 overflow-hidden pr-60">
              <Wrapper />
          </div>
        </div>*/}
    </div>
    </BrowserRouter>
  );
}

export default Home;
