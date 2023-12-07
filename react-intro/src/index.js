import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './index.css';
import MainNotLoggedIn from './views/main/mainNotLogged.js';
import Registration from './views/registration/Registration.js';
import Login from './views/login/login.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainNotLoggedIn />}>
        </Route>
        <Route path="/registration" element={<Registration />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
