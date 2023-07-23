import React, { useState } from 'react';
import "./RegistrationForm.css"
import { useNavigate  } from 'react-router-dom';
function RegistrationForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [sameUsername, setSameUserName] = useState(false)
  const [user, setUser] = useState('')
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle registration submission here
    const formData = {
      username: username,
      password: password,
    };
    const response = await fetch(
      `http://localhost:9000/register`,
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
      setSameUserName(true)
    }else{
      setSameUserName(false)
      const userData = await response.json();
      navigate("/",{
        state: { user: userData },
      })
    }


    
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
      <label>
        <span>إسم المستخدم:</span>
        
        <input
          type="text"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
      </label>
    
      <label>
      <span>كلمة السر :</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Register</button>
      {sameUsername  && <div className="alert alert-primary pop" role="alert">
        هذا المستخدم موجود مسبقاً
      </div>
      }
    </form>
     
    </>
    
  );
}

export default RegistrationForm;