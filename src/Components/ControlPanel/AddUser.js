import React from 'react'
import "./AddUser.css"
import { useNavigate } from 'react-router'
const AddUser = () => {
    const navigate = useNavigate();
    const user = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')) : sessionStorage.getItem('storedUser');

    const handleClick = () => {
        navigate('/control-panel-admin/add' , {
            state: {user: user ? user : null}
        })
    }
    const handleBack = () => {
        navigate('/' , {
            state: {user: user ? user : null}
        })
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