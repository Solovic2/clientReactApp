import React from 'react'
import "./AddUser.css"
import { useNavigate } from 'react-router'
import Button from '../../Components/ControlPanel/Button';

const AddUser = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/control-panel-admin/add')
    }
    const handleBack = () => {
        navigate('/')
    }
  return (
    <>
        <div className='navbar-buttons'>
            <Button handleClick = {handleClick} className = "btn btn-primary add-new-member" body = "إضافة مستخدم جديد"/>
            <Button handleClick = {handleBack} className = "btn btn-primary" body = "العودة للصفحة الرئيسية"/>
        </div>
    </>
  )
}

export default AddUser