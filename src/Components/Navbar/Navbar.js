import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
        // setEmail("");
        // navigate('/'); 
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key === 'email') {
                sessionStorage.removeItem(key);
            }
        }
        window.location.reload();
    }

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");

        if (storedEmail) {
            setIsLoggedIn(true);
            const name = storedEmail.split('@')[0]; // Extract name from email
            setUsername(name);
        }
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
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
                    <Link to="/">
                        {/* Doctor Icon using Font Awesome */}
                        <i className="fas fa-user-doctor doctor-icon"></i>
                        <span className="logo-text">Stay<span className="highlight">Healthy</span></span>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="nav__toggle" onClick={handleMenuClick}>
                    <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} id="menu-icon"></i>
                </div>

                {/* Navigation Links */}
                <ul className={menuOpen ? "nav__links active" : "nav__links"} id="nav-menu">
                    <li className="nav__item">
                        <Link to="/" className="nav__link">
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/instant-consultation" className="nav__link">
                            <i className="fas fa-calendar-check"></i>
                            <span>Instant Consultation</span>
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/booking-consultation" className="nav__link">
                            <i className="fas fa-calendar-plus"></i>
                            <span>Appointments</span>
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/reviews" className="nav__link">
                            <i className="fas fa-star"></i>
                            <span>Reviews</span>
                        </Link>
                    </li>

                    {isLoggedIn ? (
                        <>
                            <li className="nav__item dropdown" ref={dropdownRef}>
                                <span className="nav__link" onClick={handleDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    Hello, {username} <i className="fas fa-chevron-down" style={{ fontSize: '0.8em' }}></i>
                                </span>
                                {showDropdown && (
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>Your Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="/reports" className="dropdown-item" onClick={() => setShowDropdown(false)}>Your Reports</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li className="nav__item">
                                <button className="nav__link nav-btn-login" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav__item">
                                <Link to="/sign-up" className="nav__link nav-btn-signup">
                                    <i className="fas fa-user-plus"></i>
                                    <span>Sign Up</span>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/login" className="nav__link nav-btn-login">
                                    <i className="fas fa-sign-in-alt"></i>
                                    <span>Login</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
