import React, { useEffect, useState } from 'react'
import "./ControlPanel.css"
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/ControlPanel/Table';
import AddUser from './AddUser';
import AdminPanel from '../../Components/ControlPanel/AdminPanel';
import { useCookies } from 'react-cookie';
const ControlPanel = () => {
  const [{ user }] = useCookies(['user']);
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.data.role !== "Admin") {
      // Redirect to login page if user data is not available
      navigate("/");
      return;
    }

  }, [user, navigate])


  useEffect(() => {

    fetch("http://128.36.1.71:9000/admin/users", {
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        // The response status is in the 2xx range, so the request was successful
        return response.json();
      }
    })
      .then(data => setUsers(data))
      .catch(error => {
        // Display the error message
        console.error(error.message);
      })
  }, [navigate])

  const handleClick = () => {
    navigate('/control-panel-admin/add')
  }
  const handleBack = () => {
      navigate('/')
  }
  const handleEdit = (userID) => {
    navigate(`/control-panel-admin/edit/${userID}`, {
      state: { user: user.user }
    })
  }


  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://128.36.1.71:9000/admin-delete/" + id,
        {
          method: "DELETE",
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete card");
      } else {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      }


      // Remove the deleted card from the state
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  }


  if (!user || user.data.role !== "Admin") {
    return null;
  }
  return (
    <>
      <div className='container'>

        <AdminPanel>
          <AddUser handleBack = {handleBack} handleClick = {handleClick} />
          <Table users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
        </AdminPanel>
      </div>
    </>

  )
}

export default ControlPanel