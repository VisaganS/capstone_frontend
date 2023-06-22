import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import "./Header.scss";

const Header = () => {

    const [activeLink, setActiveLink] = useState('Programs');

    const handleNavLinkClick = (link) => {
        setActiveLink(link);
    };

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
                        <NavLink to="/"
                            onClick={() => handleNavLinkClick('Programs')}
                            className={activeLink === 'Programs' ? 'navbar__active-link' : 'navbar__navlink'}
                            >
                            Programs
                        </NavLink>
                    </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                    <div className="navbar__item">
                        <NavLink to="/userworkouts"
                            onClick={() => handleNavLinkClick('Your Workouts')}
                            className={activeLink === 'Your Workouts' ? 'active-link' : 'navbar__navlink'}
                            >
                            Your Workouts
                        </NavLink>
                    </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                    <div className="navbar__item">
                        <NavLink to="/login"
                            onClick={() => handleNavLinkClick('login')}
                            className={activeLink === 'login' ? 'active-link' : 'navbar__navlink'}
                        >
                        Login
                        </NavLink>
                    </div>
                    </NavDropdown.Item>
                </NavDropdown>
                <ul className="navbar__list">
                    <ul className="navbar__item">
                        <NavLink to="/"
                            onClick={() => handleNavLinkClick('Programs')}
                            className={activeLink === 'Programs' ? 'navbar__active-link' : 'navbar__navlink'}
                            >
                            Programs
                        </NavLink>
                    </ul>
                    <li className="navbar__item">
                        <NavLink to="/userworkouts"
                            onClick={() => handleNavLinkClick('Your Workouts')}
                            className={activeLink === 'Your Workouts' ? 'active-link' : 'navbar__navlink'}
                            >
                            Your Workouts
                        </NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink to="/login"
                            onClick={() => handleNavLinkClick('login')}
                            className={activeLink === 'login' ? 'active-link' : 'navbar__navlink'}
                        >
                        Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header >
    );
};

export default Header;