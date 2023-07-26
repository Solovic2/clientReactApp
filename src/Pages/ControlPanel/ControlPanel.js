import React, { useEffect } from 'react'
import "./ControlPanel.css"
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/ControlPanel/Table';
import AddUser from '../../Components/ControlPanel/AddUser';
import AdminPanel from '../../Components/ControlPanel/AdminPanel';
const ControlPanel = () => {
  const user = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')) : sessionStorage.getItem('storedUser');
  const navigate = useNavigate();
    useEffect(() => {
        if (!user || user.data.role !== "Admin") {
          // Redirect to login page if user data is not available
          navigate("/");
          return;
        }
    }, [user, navigate]);
    if (!user || user.data.role !== "Admin") {
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