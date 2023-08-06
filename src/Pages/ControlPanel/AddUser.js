import React from 'react'
import "./AddUser.css"
import Button from '../../Components/ControlPanel/Button';

const AddUser = (props) => {
  return (
    <>
        <div className='navbar-buttons'>
            <ul className="NavList">
                <li className='logo'>
                    <img src={process.env.PUBLIC_URL + '/logo.png'} className="img-responsive" alt="logo"/>
                </li>
                <li>
                    <Button handleClick = {props.handleBack} className = "btn btn-primary" body = "العودة للصفحة الرئيسية"/>
                </li>
                <li>
                    <Button handleClick = {props.handleClick} className = "btn btn-primary add-new-member" body = "إضافة مستخدم جديد"/>
                </li>
            </ul>
            
        </div>
    </>
  )
}

export default AddUser