import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            navigate("/");
            window.location.reload();
        } else {
            if (Array.isArray(json.error)) {
                // Handle express-validator array of errors
                setShowerr(json.error[0].msg);
            } else if (json.error) {
                // Handle single string error (e.g. user already exists)
                setShowerr(json.error);
            } else if (json.errors) {
                // Handle other error formats if any
                if (Array.isArray(json.errors)) {
                    setShowerr(json.errors[0].msg);
                } else {
                    setShowerr(json.errors);
                }
            } else {
                setShowerr("An unknown error occurred");
            }
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="signup-container">
            {/* Left Side: Branding */}
            <div className="signup-branding">
                <div className="branding-content">
                    <div className="logo">
                        <i className="fas fa-user-doctor"></i>
                        <span>Stay<span className="highlight">Healthy</span></span>
                    </div>
                    <h1>Join Our Healthcare <br /> Community</h1>
                    <p>
                        Sign up to access quality healthcare services, book appointments,
                        and manage your health journey.
                    </p>
                    <div className="features">
                        <div className="feature">
                            <i className="fas fa-calendar-check"></i>
                            <span>Easy Appointments</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-user-md"></i>
                            <span>Expert Doctors</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-shield-alt"></i>
                            <span>Secure & Private</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="signup-form-container">
                <div className="signup-form">
                    <div className="form-header">
                        <h2>Create Account</h2>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>

                    <form method="POST" onSubmit={register}>
                        {/* Name */}
                        <div className="form-group">
                            <label htmlFor="name"><i className="fas fa-user"></i> Full Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="form-group">
                            <label htmlFor="phone"><i className="fas fa-phone"></i> Phone Number</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Email Address */}
                        <div className="form-group">
                            <label htmlFor="email"><i className="fas fa-envelope"></i> Email Address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                aria-describedby="helpId"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password"><i className="fas fa-lock"></i> Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                aria-describedby="helpId"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {showerr && <div className="err" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{showerr}</div>}

                        {/* Buttons */}
                        <div className="form-buttons">
                            <button type="submit" className="btn btn-submit">
                                <i className="fas fa-user-plus"></i> Sign Up
                            </button>
                            <button type="reset" className="btn btn-submit" style={{ background: '#edf2f7', color: '#4a5568' }} onClick={() => {
                                setName('');
                                setPhone('');
                                setEmail('');
                                setPassword('');
                                setShowerr('');
                            }}>
                                <i className="fas fa-undo"></i> Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up;
