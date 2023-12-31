import React, { useEffect, useState } from "react";
import "./RegistrationForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function RegistrationForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [sameUsername, setSameUserName] = useState(false);
  const navigate = useNavigate();
  const [ cookie] = useCookies(["user"]);
  useEffect(() => {
    if (cookie.user) {
      navigate("/");
      return;
    }
  }, [cookie, navigate]);

  if (cookie.user) {
    return null;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle registration submission here
    const formData = {
      username: username,
      password: password,
    };
    const response = await fetch(`http://localhost:9000/registration/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ data: formData }),
    });
    if (!response.ok) {
      setSameUserName(true);
    } else {
      setSameUserName(false);
      const userData = await response.json();
      navigate("/", {
        state: { user: userData },
      });
    }
  };
  return (
    <>
      <div className="cover">
        <img
          src={process.env.PUBLIC_URL + "/banner.png"}
          className="img-responsive "
          alt="banner"
        />
        <div>
          <img
            src={process.env.PUBLIC_URL + "/title.png"}
            className="banner-title img-responsive "
            alt="title"
          />
        </div>
      </div>
      <div className="title">
        تسجيل حساب جديد <i className="fa-solid fa-address-card"></i>
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
          {sameUsername && (
            <div className="alert alert-primary pop" role="alert">
              هذا المستخدم موجود مسبقاً
            </div>
          )}
          <div>
            هل تملك حسابًا ؟ <Link to="/login">تسجيل الدخول</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
