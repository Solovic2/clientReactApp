import React from 'react'
import Logout from '../Login/Logout'
import Button from '../ControlPanel/Button'
import "./NavBarList.css"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
const NavBarList = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/control-panel-admin")
  }
  const [{user}] = useCookies(['user']);
  return (
    <>
        <ul className="NavList">
            <li><Logout/></li>
            {user && user.data.role === "Admin" && 
                (
                    <li><Button className = "btn btn-primary" handleClick = {handleClick} body = "لوحة التحكم "/></li>
                )
            }
        </ul>
    </>
  )
}

export default NavBarList