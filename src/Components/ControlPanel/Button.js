import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/control-panel-admin",{
      state : { user: user.user }
    })
  }
  return (
    <>
      <div className='controlPanel-button'>
          <button className='btn btn-primary' onClick={handleClick}>لوحة التحكم </button>
      </div>
    </>
  )
}

export default Button