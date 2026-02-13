import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

const ProfileCard = () => {
    const [userDetails, setUserDetails] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        } else {
            fetchUserProfile();
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
            if (!authtoken) {
                navigate("/login");
            } else {
                const response = await fetch(`${API_URL}/api/auth/user`, {
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Email": email,
                    },
                });
                if (response.ok) {
                    const user = await response.json();
                    setUserDetails(user);
                    setUpdatedDetails(user);
                } else {
                    throw new Error("Failed to fetch user profile");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
            if (!authtoken || !email) {
                navigate("/login");
                return;
            }
            const payload = { ...updatedDetails };
            const response = await fetch(`${API_URL}/api/auth/user`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                    "Email": email,
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                sessionStorage.setItem("name", updatedDetails.name);
                sessionStorage.setItem("phone", updatedDetails.phone);
                setUserDetails(updatedDetails);
                setEditMode(false);
                alert(`Profile Updated Successfully!`);
                navigate("/");
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="profile-container">
            {editMode ? (
                <form onSubmit={handleSubmit} className="profile-card">
                    <div className="profile-header">
                        <h1>Edit Profile</h1>
                    </div>
                    <div className="profile-content">
                        <div className="profile-item">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email}
                                disabled
                            />
                        </div>
                        <div className="profile-item">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={updatedDetails.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="profile-item">
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={updatedDetails.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="feedback-btn" style={{ width: '100%', marginTop: '10px' }}>Save</button>
                    </div>
                </form>
            ) : (
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
                        <button onClick={handleEdit} className="feedback-btn" style={{ width: '100%', marginTop: '10px' }}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
