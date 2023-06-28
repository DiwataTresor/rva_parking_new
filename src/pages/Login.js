import React,{useState,useEffect} from "react";
import { FaCarAlt } from 'react-icons/fa';
import { useStateContext } from "../context/ContextProvider";
import logoRva  from './../assets/logoRva.png';
import { notification,Modal} from 'antd'
import Toast from './../components/Toast'
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
 
} from '@ant-design/icons';
import 'antd/dist/antd.css';


const Login=()=> {
  const {connected,setConnected,api,idUser,nomUser,setNomUser,setIdUser,roleUser,setRoleUser}=useStateContext();
  const [loading,setLoading]=useState(false);
  const [loginInput,setLoginInput]=useState("");
  const [MotdepasseInput,setMotdepasseInput]=useState("");
  const [feedBack,setFeedBack]=useState("");

  const Login2=(e)=>{
    setLoading(true);
    let donnees=new FormData();
    donnees.append('qry',"login");
    donnees.append('login',loginInput);
    donnees.append('password',MotdepasseInput);
    setFeedBack("");
    fetch(api,{method:"POST",body:donnees})
    .then(r=>r.json())
    .then(r=>{
      setLoading(false);
      if(r.n==1)
      {
        localStorage.setItem("connected","true");
        localStorage.setItem("idUser",r.data.Id);
        localStorage.setItem("nomUser",r.data.NomUt);
        localStorage.setItem("roleUser",r.data.RoleUt);
        setNomUser(r.data.NomUt);
        setIdUser(r.data.Id);
        setRoleUser(r.data.RoleUt);
        setConnected(true);
      }else
      {
        setFeedBack("Accès refusé pour ce compte");
      }
    })
    .catch(e=>{
      Modal.error({
        title:"Connexion",
        content:"Une erreur est survenue dans le système, veuillez contacter l'admin"
      });
      //alert("Une erreur est survenue dans le système, veuillez contacter l'admin");
      setLoading(false);
    });

  }
  useEffect(()=>{
   if(localStorage.getItem("connected"))
   {
    setNomUser(localStorage.getItem("nomUser"));
    setIdUser(localStorage.getItem("idUser"));
    setRoleUser(localStorage.getItem("roleUser"));
    setConnected(true);
   }
  },[]);
  return (
    <div className="bg-blue-200 h-screen w-full p-auto justify-center items-start flex">
      <div className="h-[200px] mt-20 items-center content-center text-center">
      <h2 className="font-bold text-orange-500 text-3xl mb-2 items-center content-center flex flex-col">
         <img src={logoRva} className="w-40" />
          G.P.A - SOFT
          </h2>
        
        <h2 className="font-bold text-slate-500 text-md items-center flex flex-col">
            Gestion Informatisée de Parking Aeroportuaire 
            <FaCarAlt className="text-3xl items-center"  />
        </h2>
        <div className="w-[450px] h-[300px] bg-white rounded-md p-2 shadow-md mt-5 pt-12">
          <form onSubmit={(e)=>{Login2(); e.preventDefault()}}>
            <input
              required
              onChange={(e)=>{setLoginInput(e.target.value)}}
              type="text"
              className="w-[70%] border border-gray-200 rounded-full px-2 outline-0 py-2 focus:border-b-3 focus:border-blue-500 focus:placeholder-blue-400 focus:text-blue-500"
              placeholder="Compte utilisateur"
            />
            <input
              required
              onChange={(e)=>{setMotdepasseInput(e.target.value)}}
              type="password"
              className="w-[70%] mt-8 border border-gray-200 rounded-full px-2 outline-0 py-2 focus:border-b-3 focus:border-blue-500 focus:placeholder-blue-400 focus:text-blue-500"
              placeholder="Mot de passe"
            />

            <h3 className="mt-3">{feedBack}</h3>
            <div className="mt-5">
              <button type="submit" disabled={loading ?true:false} className="bg-blue-500 disabled text-white rounded-full px-3 py-2 w-[70%]">
                {loading && (<LoadingOutlined className="mr-5" />)}
                {loading?("Connexion en cours..."):("Se connecter")}
              </button>
            </div>
          </form>
        </div>
        <h2 className="font-thin text-md mt-4">
          &copy; 2022 | Rva - Division Informatique
        </h2>
      </div>
    </div>
  );
}

export default Login;
