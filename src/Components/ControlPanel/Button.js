import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/control-panel-admin")
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