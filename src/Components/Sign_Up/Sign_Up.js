import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';

const Sign_Up = () => {
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        phone: '',
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
        // Clear error when user types
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
        if (!formData.role) newErrors.role = 'Role is required';
        if (!formData.name.trim()) newErrors.name = 'Name is required';

        // 10-digit phone number validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Sign up data:', formData);
            alert('Sign up successful! Welcome to StayHealthy.');
            navigate('/login');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-branding">
                <div className="branding-content">
                    <div className="logo">
                        <i className="fas fa-user-doctor"></i>
                        <span>Stay<span className="highlight">Healthy</span></span>
                    </div>
                    <h1>Join Our Healthcare Community</h1>
                    <p>Sign up to access quality healthcare services, book appointments, and manage your health journey.</p>
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

            <div className="signup-form-container">
                <div className="form-header">
                    <h2>Create Account</h2>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="role">
                            <i className="fas fa-user-tag"></i> Role <span className="required">*</span>
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={errors.role ? 'error' : ''}
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                        {errors.role && <span className="error-text">{errors.role}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">
                            <i className="fas fa-user"></i> Full Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">
                            <i className="fas fa-phone"></i> Phone Number <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

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
                                placeholder="Create a password"
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

                    <div className="form-buttons">
                        <button
                            type="reset"
                            className="btn btn-reset"
                            onClick={() => {
                                setFormData({ role: '', name: '', phone: '', email: '', password: '' });
                                setErrors({});
                            }}
                        >
                            <i className="fas fa-redo"></i> Reset
                        </button>
                        <button type="submit" className="btn btn-submit">
                            <i className="fas fa-user-plus"></i> Sign Up
                        </button>
                    </div>
                </form>

                <div className="form-footer">
                    <p>By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;
