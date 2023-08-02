import React from 'react'
import Logout from '../Login/Logout'
import Button from '../ControlPanel/Button'
import "./NavBarList.css"
import { useCookies } from 'react-cookie';
const NavBarList = () => {
  const [{user}] = useCookies(['user']);
  return (
    <>
        <ul className="NavList">
            <li><Logout/></li>
            {user && user.data.role === "Admin" && 
                (
                    <li><Button/></li>
                )
            }
        </ul>
    </>
  )
}

export default NavBarList