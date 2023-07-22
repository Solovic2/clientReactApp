import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Components/Login/LoginForm';
import RegistrationForm from './Components/Registration/RegistrationForm';
import Home from './Pages/Home/Home';
import NoPage from './Pages/NoPage/NoPage';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
      
    </>
  );
}
 
export default App;
