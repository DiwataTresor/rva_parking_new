import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
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
import QRCode from "react-qr-code";

import { Modal as Modal_antd, Space, Badge } from "antd";
import { useStateContext } from "../context/ContextProvider";
import Loader from "../components/Loader";
import Taux from "../components/Taux";
import { SearchOutlined } from "@ant-design/icons";
import EditIcon from "@mui/icons-material/Edit";

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

const Entreevehicule = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newImmatriculation, setNewImmatriculation] = useState("");
  const [_numFact,set_NumFact]=useState(0);
  const [lastTaux, setLastTaux] = useState(0);

  const { api, idUser } = useStateContext();
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [listeVehicules, setListeVehicules] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [disabledComponent, setDisabledComponent] = useState(false);
  const [isModalOpen,setisModalOpen]=useState(false);

  useEffect(() => {
    //setIsOpenedPopup(true);
    let donnees = new FormData();
    donnees.append("qry", "lasttaux");
    fetch(api, { method: "POST", body: donnees })
      .then((r) => r.json())
      .then((r) => {
        setLastTaux(r);
      });
  }, []);
  const printer=()=>{
    setIsOpenedPopup(false);
    setisModalOpen(true);
  }

  const ajoutVehicule = () => {
    if (newImmatriculation.trim() !== "") {
      setOpen(false);
      setIsOpenedPopup(true);
      let donnees = new FormData();
      donnees.append("qry", "addVehicule");
      donnees.append("immatriculation", newImmatriculation);
      donnees.append("idUser", idUser);
      fetch(api, { method: "POST", body: donnees })
        .then((r) => r.json())
        .then((r) => {
          setIsOpenedPopup(false);
          if (r.n == 1) {
            set_NumFact(r.numFact);
            Modal_antd.success({
              centered: true,
              okText: "Continuer",
              content: "Vehicule bien enregistré",
              onOk:()=>{
                printer()
              }
            });
            setNewImmatriculation("");
          } else {
            Modal_antd.error({
              centered: true,
              okText: "Continuer",
              content: r.msg,
            });
          }
        })
        .catch((r) => {
          console.log(r);
          setIsOpenedPopup(false);
          Modal_antd.error({
            centered: true,
            okText: "Continuer",
            content: "Une erreur s'est produite ",
          });
        });
    } else {

    }
  };

  const handleOk=()=>{
    setisModalOpen(false);
  }
  const handleCancel=()=>{
    setisModalOpen(false);
  }
  useEffect(()=>{
    console.log(<QRCode value="Diwata" />);
  },[])
  return (
    <div className="">

      <Modal_antd title={"Impression ticket : " + _numFact} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="Terminer" okText="Imprimer">
        <QRCode value="lklll" />
      </Modal_antd>

      <div className="bg-white">
      <QRCode value="Diwata" />
        <h4 className="text-center bg-gray-50 rounded-md text-xl py-2 pl-3 text-blue-300">
          ENTREE VEHICULE
        </h4>
        <div className="bg-white p-5">
          <div className="text-center items-center content-center mt-12 bg-white py-5 flex flex-col">
            <div className="text-center bg-orange-500 w-[45%] text-xl px-5  rounded-md py-2 text-white w-fit">
              Veuillez saisir la plaque d'immatriculation
            </div> 
            <br /> 
            <input
                    disabled={disabledComponent}
                    type="text"
                    className="border border-gray-200 rounded-sm outline-none py-2 px-2 w-[45%] mt-5"
                    placeholder="Immatriculation"
                    value={newImmatriculation}
                    onChange={(e)=>{setNewImmatriculation(e.target.value)}}
                  />
          </div>
          <div className="text-center items-center content-center mt-12">
            <button
            disabled={disabledComponent}
              onClick={() => {
                if(newImmatriculation.trim()!==""){setOpen(true); }
              }}
              className="text-center bg-blue-500  text-xl px-16  rounded-md shadow-md py-2 text-white"
            >
              <EditIcon />
              Enregistrer
            </button>
          </div>
        </div>
      </div>
      <Loader isOpenedPopupProps={isOpenedPopup} textProps="Traitement en cours..." />
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
            <Typography id="transition-modal-title" variant="h6" component="h2" className="text-center">
              Enregistrement véhicule
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, mb: 2 }}
              className="mb-3 text-center"
            >
              Voulez-vous vraiment enregistrer le vehicule immatriculé <b>{newImmatriculation}</b> ?
            </Typography>
            <hr />
            <div className="mt-2 text-end pf-12">
              <button
                onClick={() => ajoutVehicule()}
                className="bg-blue-600 hover:bg-blue-400 hover:shadow-md w-50 px-2 py-2 rounded-md text-white mr-3"
              >
                Valider
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-blue-600 hover:bg-blue-400 hover:shadow-md w-50 px-2 py-2 text-white rounded-md"
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

export default Entreevehicule;
