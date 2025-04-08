'use client';
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { useAuth } from './auth-context';
// import AuthService from '../services/auth-service';
import styles from './navbar.module.css';

export const NavBar = () => {
    // const { auth, user, setAuth } = useAuth();
    // const navigate = useNavigate();
    
    // const logout = () => {
    //     AuthService.logout().then(response => {
    //         setAuth(false);
    //         navigate('/');
    //     })
    //     .catch(error => {
    //         console.log('There was a problem logging out: ' + error);
    //     });
    // };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className={`container-fluid ${styles.backgroundContainer}`}>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink key='Home' to='/'>Home</NavLink>&nbsp;
                        </li>
                        {/* <li className="nav-item">
                            <NavLink key='Project' to='/project'>Project</NavLink>&nbsp;
                        </li>
                        <li className="nav-item">
                            <NavLink key='Log In' to='/login'>Log In</NavLink>
                        </li> */}

                    </ul>
                </div>
            </div>
        </nav>

    )
}