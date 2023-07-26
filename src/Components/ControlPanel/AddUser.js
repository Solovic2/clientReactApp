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
  return (
    <>
        <div className='add-new-member'>
            
            <button type="button" className="btn btn-primary" onClick={handleClick}>إضافة مستخدم جديد</button>
            
        </div>
    </>
  )
}

export default AddUser