import './Home.css';
import React, { useEffect, useState } from 'react'
import FilterBox from '../../Components/FilterBox/FilterBox';
import NotificationBar from '../../Components/NotificationBar/NotificationBar';
import { useNavigate } from 'react-router-dom';
import NavBarList from '../../Components/NavBar/NavBarList';
import { useCookies } from 'react-cookie';

function Home() {
  const [notifyAddDelete, setNotifyAddDelete] = useState(0);
  const [notifyCountFlag, setNotifyCountFlag] = useState(0);
  const [prevNotifyAddDelete, setPrevNotifyAddDelete] = useState(null);

  const navigate = useNavigate();
  const [{user}] = useCookies(['user']);

  // Check Authorization
  useEffect(() => {
    if (!user) {
      // Redirect to login page if user data is not available
      navigate("/login");
      return;
    }
  }, [user, navigate])
  

  // Notify when delete and added at same time 
  useEffect(() => {
    setPrevNotifyAddDelete(notifyAddDelete);
  }, [notifyAddDelete]);

  useEffect(() => {
    if (prevNotifyAddDelete === 1 && notifyAddDelete === 2) {
      setNotifyAddDelete(3);
      setNotifyCountFlag(prev => prev + 1)
      setPrevNotifyAddDelete(null);
    }
  }, [notifyAddDelete, prevNotifyAddDelete]);

  const notify = (value, counterFlag) =>{
    setNotifyAddDelete(value);
    setNotifyCountFlag(counterFlag)
  }


  if (user == null) {
    return null; // Don't render anything if the user is not logged in
  }

  return (
    <>
      <div className='container'>
        <NavBarList/>
        <NotificationBar flag = {notifyAddDelete} notifyFlag = {notifyCountFlag}/>
        <FilterBox notify = {notify}/>
      </div>
    </>
  );
}
 
export default Home;
