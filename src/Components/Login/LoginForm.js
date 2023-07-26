import React, {  useState, useEffect} from 'react';
import "./LoginForm.css"
import { Link, useNavigate } from 'react-router-dom';
function LoginForm() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")

  const user = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')) : sessionStorage.getItem('storedUser');


  useEffect(() => {
    if (user) {
      // Redirect to login page if user data is not available
      navigate("/");
      return;
    }
  }, [user, navigate])

  if (user) {
    return null;
  }
  
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
      sessionStorage.setItem('storedUser', JSON.stringify(userData));
      navigate("/",{
        state: { user: userData },
      })
    }
  };

  return (
    <form className="login-form"onSubmit={handleSubmit}>
      <label>
        إسم المستخدم:
        <input
          type="text"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
      </label>
      <label>
        كلمة السر:
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
      }<div>
      لا تملك حسابًا وتريد بعمل حساب جديد؟ <Link to="/register">التسجيل</Link>
    </div>
    </form>
  ); 
  
  

  
}

export default LoginForm;