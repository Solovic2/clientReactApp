import React, { useState } from 'react';
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login submission here
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
        body: JSON.stringify({ data: formData }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error);
    }else{
      navigate("/home")
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