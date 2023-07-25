import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../Redux/userSlice';
const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const handleLogout = async (event) => {
        event.preventDefault();
        const response = await fetch('/logout');
        if (response.ok) {
            sessionStorage.removeItem('user'); // Clear the user data from session storage
            dispatch(removeUser())
            navigate('/login'); // Redirect to the login page after logging out
        } else {
        console.error('Error logging out:', response.statusText);
        }
    };
    
    return (
        <div className='logout'>
            <button className='btn btn-danger' onClick={handleLogout}>تسجيل الخروج</button>
        </div>
        
    );
    
}

export default Logout