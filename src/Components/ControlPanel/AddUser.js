import React from 'react'
import "./AddUser.css"
import { useNavigate } from 'react-router'
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
            <button type="button" className="btn btn-primary add-new-member" onClick={handleClick}>إضافة مستخدم جديد</button>
            <button type="button" className="btn btn-primary" onClick={handleBack}>العودة للصفحة الرئيسية</button>
        </div>
    </>
  )
}

export default AddUser