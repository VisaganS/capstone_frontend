import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import "./Header.scss";

const Header = ({currentPage}) => {
    const [isLogin, setLogin] = useState(sessionStorage.token || null);
    const [userData, setUserData] = useState({});
    const activeLink = currentPage;
    console.log(currentPage);

    useEffect(() => {
        axios.get('http://localhost:8080/user/profile', {
            headers: {Authorization: `Bearer ${isLogin}`}
        })
        .then((res) => {
            setUserData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <header className="header">
            <div className="header__logo-container">
                <Link to="/" className="header__logo-link">
                    <h1 className="header__logo">GYM JUNKIE</h1>
                </Link>
            </div>
            <nav className="header__navbar">
                <NavDropdown
                className="navbar__dropdown"
                title="|||"
                menuVariant="dark"
                >
                    <NavDropdown.Item>
                    <div className="navbar__item">
                        <NavLink to="/" className={activeLink === 'Programs' ? 'navbar__active-link' : 'navbar__navlink'}>
                            Programs
                        </NavLink>
                    </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                    <div className="navbar__item">
                        <NavLink to="/userworkouts" className={activeLink === 'Your Workouts' ? 'navbar__active-link' : 'navbar__navlink'}>
                            Your Workouts
                        </NavLink>
                    </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                    <div className="navbar__item">
                        <NavLink to={isLogin ? "/profile": "/login"} className={activeLink === 'Login' ? 'navbar__active-link' : 'navbar__navlink'}>
                            {isLogin ? userData.first_name : 'Login'}
                        </NavLink>
                    </div>
                    </NavDropdown.Item>
                </NavDropdown>
                <ul className="navbar__list">
                    <ul className="navbar__item">
                        <NavLink to="/programs" className={activeLink === 'Programs' ? 'navbar__active-link' : 'navbar__navlink'}>
                            Programs
                        </NavLink>
                    </ul>
                    <li className="navbar__item">
                        <NavLink to="/userworkouts" className={activeLink === 'Your Workouts' ? 'navbar__active-link' : 'navbar__navlink'}>
                            Your Workouts
                        </NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink to={isLogin ? "/profile": "/login"} className={activeLink === 'Login' ? 'navbar__active-link' : 'navbar__navlink'}>
                            {isLogin ? userData.first_name : 'Login'}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header >
    );
};

export default Header;