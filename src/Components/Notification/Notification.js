
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('email');
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }

        if (storedDoctorData) {
            setDoctorData(storedDoctorData);
        }

        if (storedAppointmentData && storedAppointmentData.length > 0) {
            setAppointmentData(storedAppointmentData[0]); // Show the first appointment for now
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }

        const handleStorageChange = () => {
            const updatedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
            const updatedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));

            setDoctorData(updatedDoctorData);

            if (updatedAppointmentData && updatedAppointmentData.length > 0) {
                setAppointmentData(updatedAppointmentData[0]);
                setShowNotification(true);
            } else {
                setDoctorData(null);
                setAppointmentData(null);
                setShowNotification(false);
            }
        }

        // Listen for custom event 'appointmentChange'
        window.addEventListener('appointmentChange', handleStorageChange);

        return () => {
            window.removeEventListener('appointmentChange', handleStorageChange);
        };

    }, []);

    return (
        <div>
            <Navbar />
            {children}
            {isLoggedIn && showNotification && appointmentData && (
                <div className="notification-container">
                    <div className="notification-card">
                        <div className="notification-card__content">
                            <h3 className="notification-card__title">Appointment Details</h3>
                            <p className="notification-card__message">
                                <strong>Doctor:</strong> {doctorData?.name}
                            </p>
                            <p className="notification-card__message">
                                <strong>Speciality:</strong> {doctorData?.speciality}
                            </p>
                            <p className="notification-card__message">
                                <strong>Name:</strong> {appointmentData?.name}
                            </p>
                            <p className="notification-card__message">
                                <strong>Phone Number:</strong> {appointmentData?.phoneNumber}
                            </p>
                            <p className="notification-card__message">
                                <strong>Date of Appointment:</strong> {appointmentData?.date}
                            </p>
                            <p className="notification-card__message">
                                <strong>Time Slot:</strong> {appointmentData?.time}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;
