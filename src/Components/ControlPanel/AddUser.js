import React from 'react'
import "./AddUser.css"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
const AddUser = (props) => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/control-panel-admin/add' , {
            state: {user: user.user}
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