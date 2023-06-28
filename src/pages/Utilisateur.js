import React, { useState, useEffect } from "react";
import { Space, Row, Card, Col,message,Modal as Modal_ant,Popover } from "antd";
import { useStateContext } from "./../context/ContextProvider";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Backdrop,
  CircularProgress,
  Fade,
  Box,
  Typography,
  Modal,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};
const Utilisateur = () => {
  const [titreModal,setTitreModal]=useState("Ajout nouvel utilisateur");
  const [utilisateurs, setUtilisateurs] = useState({ n: 0, data: [] });
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [updateOption, setUpdateOption] = useState("save");
  const [open, setOpen] = useState(false);
  const [idSelected,setIdSelected]=useState();
  const [login,setLogin]=useState();
  const [nom,setNom]=useState();
  const [role,setRole]=useState();
  const [password,setPassword]=useState();
  const [passwordBis,setPasswordBis]=useState();
  const { api, idUser } = useStateContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    let donnees = new FormData();
    donnees.append("qry", "getUtilisateur");
    fetch(api, { method: "POST", body: donnees })
      .then((r) => r.json())
      .then((res) => {
        if (res.n == 0) {
        } else {
          setUtilisateurs(res);
        }
      })
      .catch((r) => {});
  }, [utilisateurs]);

  const enregistrer = (e) => {
    e.preventDefault();
   
    let erreur=false;
    let erreurMsg="";
    if(login.length < 4) {erreur=true; erreurMsg="Le login doit avoir au moins 4 caracteres"}
    if(password!==passwordBis){erreur=true; erreurMsg="Les 2 mot de passe ne correspondent pas"}
    if(erreur)
    {
      message.error(erreurMsg);
    }else{
      setOpen(false);
      let donnees=new FormData();
      if(updateOption=="update")
      {
        donnees.append("qry","updateUser");
        donnees.append("idSelected",idSelected);
      }else
      {
        donnees.append("qry","addUser");
      }
      donnees.append("login",login);
      donnees.append("nom",nom);
      donnees.append("role",role);
      donnees.append("password",password);
      donnees.append("idUser",idUser);
      setIsOpenedPopup(true);
      fetch(api,{method: "POST",body:donnees}).then(r=>r.json())
      .then(r=>{
        setIsOpenedPopup(false);
        Modal_ant.success({
          title:"Ajout utilisateur",
          content:"Utilisateur bien ajouté"
        });
        setLogin("");
        setNom("");
        setPassword("");
        setPasswordBis("");
        setRole("");
      })
      .catch(r=>{
        setIsOpenedPopup(false);
        Modal_ant.error({
          title:"Ajout utilisateur",
          content:"Une erreur est survenue dans le système, veuillez contacter l'admin"
        })
      });
    }
    //setIsOpenedPopup(true);
  };
  const supprimerUtilisateur=(id,_nom)=>{
    Modal_ant.confirm({
      title:"Voulez-vous supprimer l'utilisateur : "+_nom,
      cancelText:"Annuler",
      okText:"Oui",
      onOk:()=>{
        delUser(id,_nom);
      }
    });
  }
  const delUser=(id,nom)=>{
    setIsOpenedPopup(true);
        let donnees=new FormData();
        donnees.append("qry","delUser");
        donnees.append("user",id);
        donnees.append("idUser",idUser);
        donnees.append("userNom",nom);
        fetch(api,{method:"POST",body:donnees}).then(r=>r.json())
        .then(r=>{
          setIsOpenedPopup(false);
          if(r.n==1)
          {
            Modal_ant.success({
              title:"Utilisateur bien supprimé"
            })
          }else
          {
            Modal_ant.error({
              title:"Echec de l'opération, veuillez reessayer plutard"
            })
          }
        })
        .catch(e=>{
          setIsOpenedPopup(false);
          Modal_ant.error({
            title:"Une erreur est survenue dans le système, veuillez contacter l'admin"
          })
        })
      
  }
  const setStatutUtilisateur=(id,_nom,statut,textStatut)=>{
    Modal_ant.confirm({
      title:"Voulez-vous "+ textStatut+" l'utilisateur : "+_nom,
      cancelText:"Annuler",
      okText:"Oui",
      onOk:()=>{
        
        setIsOpenedPopup(true);
        let donnees=new FormData();
        donnees.append("qry","statutUser");
        donnees.append("user",id);
        donnees.append("idUser",idUser);
        donnees.append("userNom",_nom);
        donnees.append("newStatut",statut);
        fetch(api,{method:"POST",body:donnees}).then(r=>r.json())
        .then(r=>{
          setIsOpenedPopup(false);
          if(r.n==1)
          {
            Modal_ant.success({
              title:"Opération bien éffectuée"
            })
          }else
          {
            Modal_ant.error({
              title:"Echec de l'opération, veuillez reessayer plutard"
            })
          }
        })
        .catch(e=>{
          setIsOpenedPopup(false);
          Modal_ant.error({
            title:"Une erreur est survenue dans le système, veuillez contacter l'admin"
          })
        })
      }
    });
  }
  const content=(
    <a href="#">Test</a>
  );
  const update=(id,nom,login,password,_role)=>{
    setIdSelected(id);
    setLogin(login);
    setNom(nom);
    setPassword(password);
    setPasswordBis(password);
    setRole(_role);
    setOpen(true);
    setUpdateOption("update");
  }
  const newUser=()=>{
    setLogin("");
    setNom("");
    setPassword("");
    setPasswordBis("");
    setRole("");
    setUpdateOption("save");
  }
  return (
    <div>
      <button
        className="bg-blue-500 px-2 py-2 text-white hover:bg-blue-300"
        onClick={() => {newUser(); handleOpen()}}
      >
        + Nouveau
      </button>
      <div className="bg-slate-400 text-gray-300 text-3xl text-center mt-4 py-2">
        Gestion des utilisateurs
      </div>
      <div className="flex gap-3 flex-row flex-wrap pt-3 justify-between bg-slate-100 p-2">
        {utilisateurs.data.map((item, i) => {
          return (
            <Card
              key={i}
              title={item.LoginUt}
              extra={
                <div>
                  <Popover content={
                    <div>
                      <a href="#">
                        <div className="mb-3 border-bottom hover:bg-slate-500 hover:text-white px-3">Journal</div>
                      </a>
                      {
                        item.StatutUt=="A"?(
                          <a href="#">
                          <div className="mb-3 border-bottom hover:bg-slate-500 hover:text-white px-3" 
                          onClick={()=>{
                            setStatutUtilisateur(item.Id,item.NomUt,'B',"Bloquer")
                          }}>
                            Bloquer
                          </div>
                        </a>
                      ):(
                        <a href="#">
                        <div className="mb-3 border-bottom hover:bg-slate-500 hover:text-white px-3" 
                        onClick={()=>{
                          setStatutUtilisateur(item.Id,item.NomUt,'A',"Débloquer")
                        }}>
                          Debloquer
                        </div>
                        </a>
                      )}
                      <a href="#" onClick={()=>{update(item.Id,item.NomUt,item.LoginUt,item.PasswordUt,item.RoleUt)}}>
                        <div className="mb-3 border-bottom hover:bg-slate-500 hover:text-white px-3">Changer mot de passe</div>
                      </a>
                      <a href="#">
                        <div onClick={()=>{supprimerUtilisateur(item.Id,item.NomUt)}} className="mb-3 border-bottom hover:bg-slate-500 hover:text-white px-3">Supprimer</div>
                      </a>
                    </div>
                  } trigger="click">
                    <a href="#">
                      <MoreVertIcon />
                    </a>
                  </Popover>
                </div>
              }
              style={{
                width: "32%",
              }}
            >
              <p className="text-center font-bold">{item.NomUt.toUpperCase()}</p>
              <p className="text-center">Role : {item.RoleUt}</p>
              <hr className="mb-4" />
              {
                item.StatutUt=='A'?(<span className='bg-green-600 rounded-sm text-white px-2 py-1'>Compte actif</span>):(<span className='bg-red-600 rounded-sm text-white px-2 py-1'>Compte bloqué</span>)
              }
            </Card>
          );
        })}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenedPopup}
      >
        <CircularProgress color="inherit" />
        <br />
        <span>Traitement en cours... </span>
      </Backdrop>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="text-center"
            >
              {titreModal}
            </Typography>

            <hr className="mb-3 mt-3" />

            <form onSubmit={(e)=>enregistrer(e)}>
              <h2 className="flex flew-row">
                <div className="w-44">Nom complet </div>
                <input
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                  type="text"
                  placeholder="Nom"
                  className="border-1 border-gray-400 rounded-sm h-6 px-2 py-0.5 focus:border-blue-300 focus:border"
                />
              </h2>
              <h2 className="flex flew-row">
                <div className="w-44">Login </div>
                <input
                required
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Login"
                  className="border-1 border-gray-400 rounded-sm h-6 px-2 py-0.5 focus:border-blue-300 focus:border"
                />
              </h2>
              <h2 className="flex flew-row">
                <div className="w-44">Role </div>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required 
                  className="border-1 border-gray-400 rounded-sm h-6 px-2 py-0.5 focus:border-blue-300 focus:border">
                  <option value="">--selectionner--</option>
                  <option value="D">Direction</option>
                  <option value="C">Caissier</option>
                  <option value="O">Opérateur checking</option>
                </select>
              </h2>
              <h2 className="flex flew-row">
                <div className="w-44">Mot de passe </div>
                <input
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  placeholder="Mot de passe"
                  className="border-1 border-gray-400 rounded-sm h-6 px-2 py-0.5 focus:border-blue-300 focus:border"
                />
              </h2>
              <h2 className="flex flew-row">
                <div className="w-44">Rétaper mot de passe </div>
                <input
                required
                value={passwordBis}
                onChange={(e)=>setPasswordBis(e.target.value)}
                  type="password"
                  placeholder="Mot de passe"
                  className="border-1 border-gray-400 rounded-sm h-6 px-2 py-0.5 focus:border-blue-300 focus:border"
                />
              </h2>

              <div className="flex flex-row space-x-2 mt-4 mb-4 justify-between"></div>
              <div className="mt-2 text-end pf-12">
                <button
                type="submit"
                  className="bg-blue-600 w-50 px-2 py-2 rounded-md text-white mr-3"
                >
                 {updateOption=="save"?"Enregistrer":"Modifier"}
                </button>
                <button
                type="button"
                  onClick={() => setOpen(false)}
                  className="bg-blue-600 w-50 px-2 py-2 text-white rounded-md"
                >
                  Annuler
                </button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>

      
    </div>
  );
};

export default Utilisateur;
