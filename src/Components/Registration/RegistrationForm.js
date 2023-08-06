import React, { useEffect, useState } from 'react';
import "./RegistrationForm.css"
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function RegistrationForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [sameUsername, setSameUserName] = useState(false)
  const navigate = useNavigate();
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
    // Handle registration submission here
    const formData = {
      username: username,
      password: password,
    };
    const response = await fetch(
      `http://128.36.1.71:9000/register`,
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
    } else {
      setSameUserName(false)
      const userData = await response.json();
      setCookie('user', JSON.stringify(userData))
      navigate("/", {
        state: { user: userData },
      })
    }



  }
  return (
    <>
      <div className='cover'>
        <div className='title'>تسجيل حساب جديد</div>
        <img src={process.env.PUBLIC_URL + '/logo.png'} className="img-responsive" alt="logo"/>
      </div>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <label>
            <span>إسم المستخدم:</span>

            <input
              type="text"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
              required
            />
          </label>

          <label>
            <span>كلمة السر :</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button type="submit">سجل الآن!</button>
          {sameUsername && <div className="alert alert-primary pop" role="alert">
            هذا المستخدم موجود مسبقاً
          </div>
          }
          <div>
            هل تملك حسابًا ؟ <Link to="/login">تسجيل الدخول</Link>
          </div>
        </form>
      </div>


    </>

  );
}

export default RegistrationForm;