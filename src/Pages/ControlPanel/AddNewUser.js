import React, { useEffect, useState } from 'react'
import "./AddNewUser.css"
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import AddEditForm from '../../Components/ControlPanel/AddEditForm';
const AddNewUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const [{user}] = useCookies(['user']);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      role: role,
    }
    try {
      const response = await fetch(
        `http://localhost:9000/admin/addUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify( {data} ),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
      } else {
        navigate('/control-panel-admin/', {
          state: { user: user }
        })
      }

    } catch (error) {
      console.error("Error deleting card:", error);
    }

  }

  return (
   <>
   <div className='logo'>
    <img src={process.env.PUBLIC_URL + '/logo.png'} className="img-responsive" alt="logo"/>
   </div>
      
      <AddEditForm username = {username} setUsername = {setUsername} password= {password} setPassword = {setPassword} role = {role} setRole = {setRole} handleSubmit = {handleSubmit} error = {error}/>
   </>
  );
}

export default AddNewUser