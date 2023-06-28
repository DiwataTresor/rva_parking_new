import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import logoRva from "./../assets/logoRva.png";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import { useStateContext } from "../context/ContextProvider";
import { Dropdown, Menu, Space } from "antd";
const Navbar = () => {
  const { connected, setConnected } = useStateContext();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="#"
            >
              Ticket
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="#"
            >
             Immatriculation
            </a>
          ),

          
        }
      ]}
    />
  );
  return (
    <div className="h-20 w-full bg-blue-600 border-b-2 border-blue-300 shadow-md flex flex-row justify-center items-center sticky top-0">
      <div className="text-left md:text-15 py-auto pt-1 pl-5 text-4xl font-bold text-white flex flex-row">
        <img src={logoRva} className="w-25 h-12" alt="Logo Rva" />
        G.P.A - SOFT
      </div>
      <div className="items-center  flex-1 justify-center pt-1 border-0 border-white content-center pl-10 pr-24">
        <form action="/recherche" className="bg-blue-500 py-1 px-2 rounded-md">
          <div className="flex flex-row">
            <input
              type="search"
              placeholder="Recherche..."
              className="mr-2 mt-1 w-[100%] px-2 rounded-sm outline-none h-9 text-black flex-1"
            />
            <button type="button" className="hover:border h-8 m-auto text-white">
              <Dropdown overlay={menu} className="text-white">
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <TuneIcon titleAccess="Filtre" />
                  </Space>
                </a>
              </Dropdown>
            </button>
            <button
              type="submit"
              className="border rounded-sm ml-4 h-8 my-auto px-3 text-sm hover:bg-blue-600"
            >
              <SearchIcon />
            </button>
          </div>
        </form>
      </div>

      <div className="pr-1 p-auto -top-4">
        <div
          onClick={() => {
            setConnected(false);
            localStorage.removeItem("connected");
          }}
          className="flex flew-row space-x-2 text-gray-200"
        >
          <AiOutlinePoweroff className="mr-2 mt-1" />
          Se deconnecter
        </div>
      </div>
    </div>
  );
};

export default Navbar;
