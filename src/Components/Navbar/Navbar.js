import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className="navbar">
                {/* Logo Section with Doctor Icon */}
                <div className="nav__logo">
                    <a href="/">
                        {/* Doctor Icon using Font Awesome */}
                        <i className="fas fa-user-doctor doctor-icon"></i>
                        <span className="logo-text">Stay<span className="highlight">Healthy</span></span>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="nav__toggle" onClick={handleClick}>
                    <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} id="menu-icon"></i>
                </div>

                {/* Navigation Links */}
                <ul className={menuOpen ? "nav__links active" : "nav__links"} id="nav-menu">
                    <li className="nav__item">
                        <a href="../Landing_Page/LandingPage.html" className="nav__link">
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li className="nav__item">
                        <a href="#" className="nav__link">
                            <i className="fas fa-calendar-check"></i>
                            <span>Appointments</span>
                        </a>
                    </li>
                    <li className="nav__item">
                        <a href="../Sign_Up/Sign_Up.html" className="nav__link btn-signup">
                            <i className="fas fa-user-plus"></i>
                            <span>Sign Up</span>
                        </a>
                    </li>
                    <li className="nav__item">
                        <a href="../Login/Login.html" className="nav__link btn-login">
                            <i className="fas fa-sign-in-alt"></i>
                            <span>Login</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
