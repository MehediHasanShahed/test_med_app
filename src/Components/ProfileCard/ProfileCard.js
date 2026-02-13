import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

const ProfileCard = () => {
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        const storedName = sessionStorage.getItem("name");
        const storedPhone = sessionStorage.getItem("phone");

        if (!storedEmail) {
            navigate("/login");
        } else {
            setUserDetails({
                name: storedName || "User",
                email: storedEmail,
                phone: storedPhone || "N/A",
            });
        }
    }, [navigate]);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h1>Welcome, {userDetails.name}</h1>
                </div>
                <div className="profile-content">
                    <div className="profile-item">
                        <label>Name:</label>
                        <p>{userDetails.name}</p>
                    </div>
                    <div className="profile-item">
                        <label>Email:</label>
                        <p>{userDetails.email}</p>
                    </div>
                    <div className="profile-item">
                        <label>Phone:</label>
                        <p>{userDetails.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
