import React, { useEffect } from 'react'
import "./ControlPanel.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '../../Components/ControlPanel/Table';
import AddUser from '../../Components/ControlPanel/AddUser';
import AdminPanel from '../../Components/ControlPanel/AdminPanel';
const ControlPanel = () => {

  const {user} = useSelector(state=>state.user)
  const navigate = useNavigate();
    useEffect(() => {
        if (user === null || user.data.role !== "Admin") {
          // Redirect to login page if user data is not available
          navigate("/");
          return;
        }
    }, [user, navigate]);
    if (user === null || user.data.role !== "Admin") {
        return null;
    }
   
  return (
    <>
       <div className='container'>
            
            <AdminPanel>
                <AddUser/>
                <Table/>
            </AdminPanel>
       </div>
    </>
    
  )
}

export default ControlPanel