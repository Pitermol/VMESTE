import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigation, useNavigate } from "react-router-dom"
import './index.css';
import MainNotLoggedIn from './views/main/mainNotLogged.js';
import Registration from './views/registration/Registration.js';
import Login from './views/login/login.js';
import UsersProfile from './views/users_profile/users_profile.js';
import MyProfile from './views/my_profile/MyProfile.js';
import Error404 from './views/error404/error404.js';
import ChangeProfile from './views/change_profile/ChangeProfile.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainNotLoggedIn navigate={ useNavigate } />}>
        </Route>
        <Route path="/registration" element={<Registration navigate={ useNavigate } />}>
        </Route>
        <Route path="/login" element={<Login navigate={ useNavigate } />}>
        </Route>
        <Route path="/users_profile/:userId" element={<UsersProfile navigate={ useNavigate } />}>
        </Route>change_profile
        <Route path="/my_profile" element={<MyProfile navigate={ useNavigate } />}>
        </Route>
        <Route path="/change_profile" element={<ChangeProfile navigate={ useNavigate } />}>
        </Route>
        <Route path="*" element={<Error404 navigate={ useNavigate } />}>
        </Route>
      </Routes>
    </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
