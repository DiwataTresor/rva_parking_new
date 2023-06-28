import React, { useEffect, useState } from "react";
import Sidebar from "./../components/Sidebar";
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import {
  Box,
  Button,
  Paper,
  TextField,
  Backdrop,
  CircularProgress,
  Snackbar,
  AlertTitle,
  Modal,
  Fade,
  Typography,
} from "@mui/material";

import { Modal as Modal_antd, Space, Badge, InputNumber } from "antd";
import { useStateContext } from "./../context/ContextProvider";
import Taux from "./../components/Taux";
import { SearchOutlined } from "@ant-design/icons";
import moment from 'moment';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ticket, setTicket] = useState();
  const [selectedTicket, setSelectedTicket] = useState();
  const [immatriculation, setImmatriculation] = useState();
  const [dtEntree, setDtEntree] = useState(moment().format("YYYY-MM-DD"));
  const [heureEntree, setHeureEntree] = useState();
  const [dtPaye, setDtPaye] = useState();
  const [heurePaye, setHeurePaye] = useState();
  const [mtAPayer, setMtAPayer] = useState(0);
  
  
  const [taux, setTaux] = useState(0);

  const [isMontantPayeCalcule,setIsMontantPayeCalcule]=useState(false);

  const { api, idUser, endPoint } = useStateContext();
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const impression = endPoint + "/facture.php";

  
  useEffect(() => {
    let donnees = new FormData();
    donnees.append("qry", "lasttaux");
    fetch(api, { method: "POST", body: donnees })
      .then((r) => r.json())
      .then((r) => {
        //alert(r);
        setTaux(r);

        //setMtPayeCDF(parseFloat(mtPayeUSD)*parseFloat(taux));
        //alert(taux);
      });
  }, []);

  const validerPaye = () => {
    setOpen(false);
    setIsOpenedPopup(true);

    let donnees = new FormData();
    donnees.append("qry", "validerPaiement");
    donnees.append("ticket", ticket);
    donnees.append("idUser", idUser);
    
    fetch(api, { method: "POST", body: donnees })
      .then((r) => r.json())
      .then((r) => {
        if (r.n == 1) {
          setIsOpenedPopup(false);
          window.location.reload();
          window.open(endPoint + "facture.php?fact=" + ticket);
          setDtEntree("");
          setHeureEntree("");
          // Modal_antd.success({
          //   centered: true,
          //   okText: "Continuer",
          //   content: "Données bien enregistrées",
          //   onOk: () => {              
          //   },
          // });
        } else {
          setIsOpenedPopup(false);
          Modal_antd.error({
            centered: true,
            okText: "Continuer",
            content: "Une erreur s'est produite 1" + r.msg,
          });
        }
      })
      .catch((e) => {
        setIsOpenedPopup(false);
        Modal_antd.error({
          centered: true,
          okText: "Continuer",
          content: "Une erreur s'est produite " + e.msg,
        });
      });
  };
 
  const print = () => {
    //window.po
    //setOpenPrint(true);
  };
  const calculerMtAPayer=()=>{
    setOpen(true);
    let donnees=new FormData();
    donnees.append("qry","calculerMtAPayer");
    donnees.append("dtEntree",dtEntree);
    donnees.append("heureEntree",heureEntree);
    fetch(api, { method: "POST", body: donnees}).then(r=>r.json())
    .then(r=>{
        setMtAPayer(r.mt);
        setDtPaye(r.dt);
        setHeurePaye(r.heure);
        setIsMontantPayeCalcule(true);
        setIsOpenedPopup(false);
    })
  }
  const facturation=()=>{
    setOpen(false);
    setIsOpenedPopup(true);
    let donnees=new FormData();
    donnees.append("qry","addVehiculeManuel");
    donnees.append("immatriculation",immatriculation);
    donnees.append("dtEntree",dtEntree);
    donnees.append("dtPaye",dtPaye);
    donnees.append("heureEntree",heureEntree);
    donnees.append("heurePaye",heurePaye);
    donnees.append("idUser",idUser);
    donnees.append("bordereau",ticket);
    donnees.append("mtAPayer",mtAPayer);
    fetch(api, { method: "POST", body: donnees }).then(r=>r.json())
    .then(r=>{
        if(r.n==1){
            setTicket("");
            setImmatriculation("");
            setDtEntree(null);
            setHeureEntree(null);
            setIsOpenedPopup(false);
            window.open(endPoint + "facture.php?fact=" + r.numFact);
            window.location.reload();
        }else
        {
            setIsOpenedPopup(false);
            Modal_antd.error({
                title:"Echec d'enregistrement",
                content:r.msg
            })
        }
    })
    .catch(err=>{
        setIsOpenedPopup(false);
        Modal_antd.error({
            title: "Echec d'enregistrement",
            content:"Une erreur s'est produite dans le système, veuillez contacter l'admin"
        });
    });
  }
  return (
    <div className="">
      <div className="items-end text-end">
        <Taux />
      </div>
      <h4 className="text-center bg-gray-50 rounded-sm text-xl py-2 pl-3 text-blue-300 w-[50%] m-auto mb-2">
        FACTURATION MANUELLE
      </h4>
      <div className="">
        <div className="bg-slate-700 w-[50%] text-white text-center py-3 m-auto">
          SAISIE
        </div>
        <div className="bg-white p-3 m-auto w-[50%] flex flex-row">
          <div className="w-[70%]">
            <form onSubmit={(e)=>{calculerMtAPayer(); e.preventDefault()}}>
              <label htmlFor="ticket">N° Bordereau </label> <br />
              <input
                type="text"
                value={ticket}
                onChange={(e)=>setTicket(e.target.value)}
                required="required"
                id="ticket"
                className="outline-none border border-gray-300 py-2 px-2 rounded-md w-[70%] mb-3"
              />{" "}
              <br />
              <label htmlFor="immatriculation" className="mt-4">
                Plaque d'immatriculation
              </label>
              <br />
              <input
                type="text"
                value={immatriculation}
                onChange={(e)=>setImmatriculation(e.target.value)}
                required="required"
                id="immatriculation"
                className="outline-none border border-gray-300 py-2 px-2 rounded-md w-[70%] mb-3"
              />
              <br />
              <label htmlFor="immatriculation" className="mt-4">
                Date d'entrée
              </label>
              <br />
              <input
                type="date"
                value ={dtEntree}
                required="required"
                id="immatriculation"
                onChange={(e)=>setDtEntree(e.target.value)}
                className="outline-none border border-gray-300 py-2 px-2 rounded-md w-[70%] mb-3"
              />
              <br />
              <label htmlFor="immatriculation" className="mt-4">
                Heure d'entrée
              </label>
              <br />
              <input
                type="time"
                value={heureEntree}
                onChange={(e)=>setHeureEntree(e.target.value)}
                required="required"
                id="immatriculation"
                className="outline-none border border-gray-300 py-2 px-2 rounded-md w-[70%]"
              />
              <br />
              <button
                type="submit"
                className="bg-blue-500 w-[25%] mt-3 text-white py-2 rounded-md hover:bg-blue-300"
              >
                Enregistrer
              </button>
            </form>
          </div>
          <div>
            Montant à payer: 
          </div>
        </div>
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
              Voulez-vous enregistrer cette opération ?
            </Typography>
            <hr />
            <h2>
              Immatriculation :{immatriculation}
              <span className="font-bold text-md"> {selectedTicket}</span>
            </h2>
            <h2>
              Montant à payer :{" "}
              <span className="font-bold text-md"> 
              {
                mtAPayer > 0?(
                    mtAPayer
                    ):(
                    <CircularProgress />
                )
            } USD</span>
            </h2>
            <div className="mt-2 text-end pf-12">
              <button
              disabled={!isMontantPayeCalcule}
                onClick={() => facturation()}
                className={!isMontantPayeCalcule?"bg-blue-300 w-50 px-2 py-2 rounded-md text-white mr-3":"bg-blue-500 w-50 px-2 py-2 rounded-md text-white mr-3"}>
                Valider
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-blue-600 w-50 px-2 py-2 text-white rounded-md"
              >
                Annuler
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* Pour affichage PDF */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPrint}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPrint}>
          <Box sx={style}>
            <div className="flex flex-row space-x-2 mt-4 mb-4 justify-between">
              <iframe src={impression} width="600" height="400"></iframe>
            </div>
            <div className="mt-2 text-end pf-12">
              <button
                onClick={() => setOpenPrint(false)}
                className="bg-blue-600 w-50 px-2 py-2 text-white rounded-md"
              >
                Annuler
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Home;
