import React from 'react'
import Logout from '../Login/Logout'
import Button from '../ControlPanel/Button'
import "./NavBarList.css"
const NavBarList = () => {
  const user = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')) : sessionStorage.getItem('storedUser');
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