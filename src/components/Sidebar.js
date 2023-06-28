import React, { useEffect, useState } from "react";
import logo from "./../logo.svg";
import { Scrollbars } from "react-custom-scrollbars";
import "./../App.css";
import profile1 from "./../assets/profile1.jpg";
import { MdManageAccounts } from "react-icons/md";
import { GoGear, GoHome } from "react-icons/go";
import { FcFinePrint } from "react-icons/fc";
import { AiTwotoneHome } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import {Link} from 'react-router-dom'

import { NavLink } from "react-router-dom";
import logoRva from "./../assets/logoRva.png";
import { useStateContext } from "../context/ContextProvider";

function App({ w }) {
  const { nomUser, roleUser } = useStateContext();
  const [showEntree, setShowEntree] = useState(true);
  const [showPaiement, setShowPaiement] = useState(true);
  const [showSortie, setShowSortie] = useState(true);
  const [showRecette, setShowRecette] = useState(true);
  const [showRecetteGlobal, setShowRecetteGlobal] = useState(true);
  const [showJournal, setShowJournal] = useState(true);
  const [showGestionTaux, setShowGestionTaux] = useState(true);
  const [showGestionUser, setShowGestionUser] = useState(true);
  useEffect(() => {
    if (roleUser == "C") {
      setShowEntree(false);
      setShowSortie(false);
      setShowJournal(false);
      setShowGestionTaux(false);
      setShowGestionUser(false);
      setShowRecette(false);
      setShowRecetteGlobal(false);
    }
    if (roleUser == "O") {
      setShowEntree(true);
      setShowSortie(true);
      setShowPaiement(false);
      setShowJournal(false);
      setShowGestionTaux(false);
      setShowGestionUser(false);
      setShowRecette(false);
      setShowRecetteGlobal(false);
    }
    if (roleUser == "D") {
      setShowGestionUser(false);
      setShowRecette(true);
      setShowRecetteGlobal(true);
      setShowGestionUser(true);
    }
  }, []);
  return (
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={"100%"}
      autoHeightMax={"100%"}
      thumbMinSize={50}
      universal={true}
      className="w-full flex flex-col justify-between content-start relative h-screen shadow-md p-2 bg-zinc-100 overflow-hidden scroll-m-0"
    >
      <div className="w-full border-slate-50 content-end text-left overflow-y-auto">
        <div className="flex flex-row justify-between border-b pb-2">
          <img
            className="w-14 h-14 rounded-full"
            src={profile1}
            alt="Profile 1"
          />
          <h5 className="mt-5 text-orange-400 font-bold">{nomUser}</h5>
          <span className="mt-5">
            <MdManageAccounts className="text-3xl text-blue-200 hover:rounded-full hover:bg-blue-500 p-1 cursor-pointer" />
          </span>
        </div>
        <Link to="/">
          <h4 className="mt-3 font-bold flex flex-row space-x-5 pl-3 mb-8 hover:bg-gray-200 p-2 cursor-pointer">
            <AiTwotoneHome className="text-xl text-blue-200 mr-2" />
            Dashboard
          </h4>
        </Link>
        <h4 className="mt-3 font-bold flex flex-row space-x-5 pl-3">
          <GrTransaction className="text-xl text-blue-200 mr-2" />
          Opérations
        </h4>

        <div className="pl-1 pt-2">
          
          {/*
          showEntree?(
            <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
              <Link to="/entreevehicule">Entrée vehicule</Link>
            </h6>
          ):null
          */}
          {showPaiement ? (
            <>
              {/*<h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
                <Link to="/EncaissementScanner">Encaissement scanner</Link>
              </h6>
              <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
                <Link to="/encaissement">Paiement ticket</Link>
              </h6>
              <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
                <Link to="/encaissementmanuel">Paiement Manuel</Link>
              </h6>*/}
            </>
          ) : null}
          {/*
          showSortie?(
            
          <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
            <Link to="/sortievehicule">Sortie Véhicule</Link>
          </h6>
          ):null
          */}
        </div>

        <h4 className="mt-3 font-bold flex flex-row space-x-5 pl-3">
          <FcFinePrint className="text-xl text-blue-200 mr-2" />
          Rapports
        </h4>
        <div className="pl-1 pt-2">
          <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
            <Link to="/recettecaissier">Recette/caissier</Link>
          </h6>
          <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
            <Link to="/rapportticketoffline">Tickets offline</Link>
          </h6>
          {showRecette && (
            <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
              <Link to="/encaissementdujour">Recette journalière</Link>
            </h6>
          )}
          {showRecette && (
            <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
              <Link to="/rapportglobal">Rapport global</Link>
            </h6>
          )}
          <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
            <Link to="/vehiculestationne">Véhicules en stationnements</Link>
          </h6>
          <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
            <Link to="/encaissement">Stationnement/période</Link>
          </h6>
          {showJournal ? (
            <h6 className=" rounded-full pl-3 py-2 px-0.5 mb-2 text-12">
              <Link to="/journal">Journal</Link>
            </h6>
          ) : null}
        </div>
 
        <h4 className="mt-5 flex font-bold flex-row space-x-5 pl-3 ">
          <GoGear className="text-xl  text-blue-200 mr-2" />
          Parametres
        </h4>
        <div className="pl-1 pt-2">
          <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
            <Link to="/tarification">Tarification</Link>
          </h6>

          {showGestionTaux ? (
            <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
              <Link to="/taux">Gestion Taux d'echange</Link>
            </h6>
          ) : null}
          {roleUser=="A" ? (
            <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
              <Link to="/mouvements">Mouvements</Link>
            </h6>
          ) : null}
          {showGestionUser ? (
            <>
              <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
                <Link to="/reinit">Réinitialisation</Link>
              </h6>
              <h6 className=" rounded-sm pl-3 py-2 px-0.5 mb-2 text-12">
                <Link to="/utilisateur">Gestion Utilisateurs</Link>
              </h6>
            </>
          ) : null}
        </div>
      </div>
      <div className="text-white bg-blue-300 py-0.5 text-center">
        Se deconnecter
      </div>
    </Scrollbars>
  );
}
export default App;
