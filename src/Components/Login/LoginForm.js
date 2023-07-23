import React, { useEffect, useState } from 'react';
import "./LoginForm.css"
import { useLocation, useNavigate } from 'react-router-dom';



function LoginForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
  const userData = location.state?.user;
  // useEffect(() => {
  //   if(userData){
  //     navigate("/");
  //     return;
  //   }
  // }, [userData, navigate])
  
  // if (userData) {
  //   return null; // Don't render anything if the user is not logged in
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username: username,
      password: password,
    };
    const response = await fetch(
      `http://localhost:9000/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ data: formData }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error);
    }else{
      const userData = await response.json();
      navigate("/",{
        state: { user: userData },
      })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Login</button>
      {error  && <div className="alert alert-primary pop" role="alert">
        {error}
      </div>
      }
    </form>
  ); 

  
}

export default LoginForm;