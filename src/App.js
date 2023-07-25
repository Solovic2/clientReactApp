import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Components/Login/LoginForm';
import RegistrationForm from './Components/Registration/RegistrationForm';
import Home from './Pages/Home/Home';
import NoPage from './Pages/NoPage/NoPage';
import {Provider} from 'react-redux'
import { persistor, store } from './Redux/state';
import { PersistGate } from 'redux-persist/integration/react';
import ControlPanel from './Pages/ControlPanel/ControlPanel';
import AddNewUser from './Pages/ControlPanel/AddNewUser';
function App() {

  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/control-panel-admin" element={<ControlPanel />}/>
            <Route path="/control-panel-admin/add" element={<AddNewUser />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
    
      
    </>
  );
}
 
export default App;
