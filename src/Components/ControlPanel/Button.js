import { useNavigate } from 'react-router-dom';

const Button = () => {
  const user = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')) : sessionStorage.getItem('storedUser');
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/control-panel-admin",{
      state: {user : user ? user : null}
    })
  }
  return (
    <>
      <div className='controlPanel-button'>
          <button className='btn btn-primary' onClick={handleClick}>لوحة التحكم </button>
      </div>
    </>
  )
}

export default Button