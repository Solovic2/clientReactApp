import React, { useEffect, useState } from 'react'
import "./AddNewUser.css"
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">إسم المستخدم :</label>
          <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">كلمة السر :</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="role">دور المستخدم : </label>
          <select id="role" value={role} onChange={e => setRole(e.target.value)}>
            <option value="User">مستخدم</option>
            <option value="Manager">مدير</option>
            <option value="Admin">أدمن النظم</option>
          </select>
        </div>
        <button type="submit">إضافة مستخدم جديد</button>
        {error  && <div className="alert alert-primary pop" role="alert">
        {error}
      </div>
      }
      </form>
    </div>
  );
}

export default AddNewUser