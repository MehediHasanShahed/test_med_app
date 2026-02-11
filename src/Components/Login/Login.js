import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
    // State variables for email and password
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Restore password toggle state

    // Get navigation function from react-router-dom
    const navigate = useNavigate();

    // Check if user is already authenticated, then redirect to home page
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, []);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle login form submission
    const login = async (e) => {
        e.preventDefault();
        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // Parse the response JSON
        const json = await res.json();
        if (json.authtoken) {
            // If authentication token is received, store it in session storage
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('email', email);
            // Redirect to home page and reload the window
            navigate('/');
            window.location.reload();
        } else {
            // Handle errors if authentication fails
            if (json.errors) {
                for (const error of json.errors) {
                    alert(error.msg);
                }
            } else {
                alert(json.error);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-branding">
                <div className="branding-content">
                    <div className="logo">
                        <i className="fas fa-user-doctor"></i>
                        <span>Stay<span className="highlight">Healthy</span></span>
                    </div>
                    <h1>Welcome Back!</h1>
                    <p>Login to access your healthcare dashboard, manage appointments, and stay connected with your doctors.</p>
                    <div className="features">
                        <div className="feature">
                            <i className="fas fa-heartbeat"></i>
                            <span>Track Health</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-history"></i>
                            <span>View History</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-comments"></i>
                            <span>Chat with Doctors</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-form-container">
                <div className="form-header">
                    <h2>Login</h2>
                    <p>Are you a new member? <Link to="/sign-up">Sign Up Here</Link></p>
                </div>

                <div className="login-form">
                    <form onSubmit={login}>
                        {/* Email Field */}
                        <div className="form-group">
                            <label htmlFor="email">
                                <i className="fas fa-envelope"></i> Email
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                aria-describedby="helpId"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label htmlFor="password">
                                <i className="fas fa-lock"></i> Password
                            </label>
                            <div className="password-input">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    aria-describedby="helpId"
                                    required
                                />
                                <i
                                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                    onClick={togglePassword}
                                ></i>
                            </div>
                        </div>

                        {/* Form Options (Remember Me / Forgot Password) */}
                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" name="remember" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className="btn btn-login">
                                <i className="fas fa-sign-in-alt"></i> Login
                            </button>
                            <button
                                type="reset"
                                className="btn btn-login"
                                style={{ background: '#edf2f7', color: '#4a5568', marginTop: '10px' }}
                                onClick={() => { setEmail(''); setPassword(''); }}
                            >
                                <i className="fas fa-undo"></i> Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
