import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './Bars.css';
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;

  const [name, setName] = useState("");
  
  // Navigate
  const Navigate = useNavigate();

  useEffect(() => {
      Axios.get(`/${USER}`)
        .then((data) => {
          setName(data.data.name);
          console.log(data.data.role)
        })
        .catch(() => Navigate('/login', { replace: true }));
  }, [Navigate]);
  


  return (
    <div className='top-bar'>
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-3">
          <h2 className="m-0">Dashboard</h2>
          <FontAwesomeIcon onClick={() => setIsOpen(prev => !prev)} cursor={'pointer'} icon={faBars} />
        </div>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <h5 className="m-0">{name}</h5>
          <NavLink className="px-3 py-2 btn btn-outline-primary" to="/">Go To Home Page</NavLink>
        </div>
      </div>
    </div>
  );
}