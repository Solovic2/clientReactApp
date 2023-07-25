import React from 'react'
import Logout from '../Login/Logout'
import Button from '../ControlPanel/Button'
import "./NavBarList.css"
import { useSelector } from 'react-redux'
const NavBarList = () => {
  const {user} = useSelector(state=>state.user)
  return (
    <>
        <ul className="NavList">
            <li><Logout/></li>
            {user != null && user.data.role === "Admin" && 
                (
                    <li><Button/></li>
                )
            }
        </ul>
    </>
  )
}

export default NavBarList