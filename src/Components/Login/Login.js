import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Login data:', formData);
            alert('Login successful! Welcome back to StayHealthy.');
            navigate('/');
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
                    <p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">
                            <i className="fas fa-envelope"></i> Email Address <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <i className="fas fa-lock"></i> Password <span className="required">*</span>
                        </label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                            />
                            <i
                                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                onClick={togglePassword}
                            ></i>
                        </div>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
