import React, { useState,useEffect } from "react";
import { FaCarAlt } from "react-icons/fa";
import Taux from './../components/Taux'
import { useStateContext } from "./../context/ContextProvider";
import {CircularProgress} from '@mui/material'
import DataObjectIcon from '@mui/icons-material/DataObject';
const Wrapper = () => {
  const { api,idUser } = useStateContext();
  const [today,setToday]=useState([]);
  const [journal,setJournal]=useState([]);
  const [currentMonth,setCurrentMonth]=useState([]);
  const [currentYear,setCurrentYear]=useState([]);
  const [vehiculeStationne,setVehiculeStationne]=useState([]);
  const [recetteByDay,setRecetteByDay]=useState([]);
  const [recetteByDayMtUSD,setRecetteByDayMtUSD]=useState(0);
  const [recetteByDayMtCDF,setRecetteByDayMtCDF]=useState(0);
  useEffect(() => {
    let donnees=new FormData();
    donnees.append("qry","dashboardData");
    fetch(api,{method:"POST",body:donnees}).then(r=>r.json())
    .then(r=>{
      setToday(r.today.length);
      setCurrentMonth(r.currentMonth.length);
      setCurrentYear(r.currentYear.length);
      setVehiculeStationne(r.vehiculeStationne.length);
      setJournal(r.journal);
      if(r.recetteByDay.length!==0)
      {
        setRecetteByDayMtCDF(r.recetteByDay.reduce(
          (a,b)=>{
            return(a+b.MontantPayeCDF)
          },0
          ));

          setRecetteByDayMtUSD(r.recetteByDay.reduce(
            (a,b)=>{
              return(a+b.MontantPayeUSD)
            },0
            ));
      }else
      {
        setRecetteByDayMtCDF(0);

      }
    });
  }, [today,journal]);
  return (
    <div className="">
      <div className="text-end">
        <Taux />
      </div>
      <h3 className="font-bold mb-4 text-sky-600 pl-12 text-xl">Tableau de Bord</h3>
      <div className="flex flex-row w-full items-center justify-between space-x-2">
        <div className="flex-1 rounded-sm h-32 bg-purple-700 p-2 border-0 border-white shadow-md">
          <div className="flex flex-col content-between">
            <h4 className=" text-white flex flex-row">
              <FaCarAlt className="mr-3 text-3xl" />
              Véhicules/jour
            </h4>
            <h6 className="text-center text-xl font-extrabold text-white">
              {today}
            </h6>
            <div className="items-end content-end text-center pr-3 pt-1">
              <button className="bg-blue-400 hover:bg-blue-300 px-4 py-1 rounded-3xl ">Detail</button>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-sm h-32 bg-green-700 p-2 border-0 border-white shadow-md">
          <div className="flex flex-col content-between">
            <h4 className=" text-white flex flex-row">
              <FaCarAlt className="mr-3 text-3xl" />
              Vehicules en stationnement
            </h4>
            <h6 className="text-center text-xl font-extrabold text-white">
            {vehiculeStationne}
            </h6>
            <div className="items-end content-end text-center pr-3 pt-1">
              <button className="bg-blue-200 hover:bg-blue-300 px-4 py-1 rounded-3xl ">Detail</button>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-sm h-32 bg-indigo-700 p-2 border-0 border-white shadow-md">
          <div className="flex flex-col content-between">
            <h4 className=" text-white flex flex-row">
              <FaCarAlt className="mr-3 text-3xl" />
              Véhicules/année
            </h4>
            <h6 className="text-center text-xl font-extrabold text-white">
            {currentYear}
            </h6>
            <div className="items-end content-end text-center pr-3 pt-1">
              <button className="bg-blue-200 hover:bg-blue-300 px-4 py-1 rounded-3xl ">Detail</button>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-sm h-32 bg-red-700 p-2 border-0 border-white shadow-md">
          <div className="flex flex-col content-between">
            <h4 className=" text-white flex flex-row">
              <FaCarAlt className="mr-3 text-3xl" />
              Recettes journ.
            </h4>
            <h6 className="text-center text-xl font-extrabold text-white">
              {"USD : "+recetteByDayMtUSD +" | CDF : "+recetteByDayMtCDF}
            </h6>
            <div className="items-end content-end text-center pr-3 pt-1">
              <button className="bg-blue-200 hover:bg-blue-300 px-4 py-1 rounded-3xl ">Detail</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row space-x-2 mt-4 ">
        <div className="bg-white w-full h-fit rounded-sm flex-1 p-3 shadow-md min-h-[440px] flex flex-col">
        <h3 className="text-gray-light bg-gray-100 w-full text-center py-3 text-lg">
          Statistique Annuelle
        </h3>
          <div className="content-center p-auto flex-1 justify-center align-middle items-center content-center text-center">
            
              <div className="text-3xl text-gray-400 pt-10 mt-10"> Pas encore des données compilées</div>
            <DataObjectIcon size={45} />  
          </div>  
        </div>
        <div className="w-80 h-fit bg-white shadow-md rounded-sm p-3 min-h-[440px] flex flex-col items-center">
          <h3 className="text-gray-light bg-gray-100 w-full text-center py-3 text-lg">
            Journal opération
          </h3>
          <div className="content-center items-center p-auto flex-1 justify-center align-middle w-full h-content truncate">
            {
              journal.length==0?(
                <h4>Aucun element dans le journal</h4>  
              ):
              (journal.map((item) => {
                  return (  
                    <div>
                      <div className="text-17 font-bold py-1 truncate">
                        {item.operation}
                      </div>  
                      <div className="text-sm py-3 truncate flex flex-row justify-between">
                      <div> {item.dt} {item.heure}  </div> 
                      <div> Par {item.user}</div> 
                      </div> 
                      <hr />  


                    </div>
                  )
                  })
              )}
              <div className="items-center text-center">
                <a href="journal" className="bg-blue-500 rounded-full px-2 py-2 text-white mt-2">Tout le journal</a>    
              </div>    
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
