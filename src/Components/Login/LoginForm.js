import React, { useState, useEffect } from 'react';
import "./LoginForm.css"
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
  const [{ cookie }, setCookie] = useCookies(['user']);


  useEffect(() => {

    if (cookie) {
      // Redirect to login page if user data is not available
      navigate("/");
      return;
    }
  }, [cookie, navigate])

  if (cookie) {
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
    } else {
      const userData = await response.json();
      setCookie('user', JSON.stringify(userData));
      navigate("/", {
        state: { user: userData },
      })
    }
  };

  return (
    <>
      <div className='cover'>
        <div className='title'>تسجيل الدخول</div>
        <img src={process.env.PUBLIC_URL + '/logo.png'} className="img-responsive" alt="logo"/>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          إسم المستخدم:
          <input
            type="text"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </label>
        <label>
          كلمة السر:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit">تسجيل الدخول</button>
        {error && <div className="alert alert-primary pop" role="alert">
          {error}
        </div>
        }<div>
          لا تملك حسابًا وتريد بعمل حساب جديد؟ <Link to="/register">التسجيل</Link>
        </div>
      </form>
    </>

  );




}

export default LoginForm;