import React from 'react'
import "./AddUser.css"
import Button from '../../Components/ControlPanel/Button';

const AddUser = (props) => {
  return (
    <>
        <div className='navbar-buttons'>
            <Button handleClick = {props.handleClick} className = "btn btn-primary add-new-member" body = "إضافة مستخدم جديد"/>
            <Button handleClick = {props.handleBack} className = "btn btn-primary" body = "العودة للصفحة الرئيسية"/>
        </div>
    </>
  )
}

export default AddUser