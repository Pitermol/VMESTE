import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import MainNotLoggedIn from '../views/main/mainNotLogged.js';
import Registration from '../views/registration/Registration.js';
import Login from '../views/login/login.js';
import UsersProfile from '../views/users_profile/users_profile.js';
import MyProfile from '../views/my_profile/MyProfile.js';
import Error404 from '../views/error404/error404.js';
import ChangeProfile from '../views/change_profile/ChangeProfile.js';

test("Example 1 renders successfully", () => {
    render(
        <Router>
            <MyProfile navigate={ useNavigate } />
        </Router>
    );

    const element = screen.getByText(/Последнее путешествие/i);

    expect(element).toBeInTheDocument();
})