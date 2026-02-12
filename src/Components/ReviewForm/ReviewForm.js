import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ReviewForm.css';

const ReviewForm = () => {
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
    });

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointmentData')) || [];
        setAppointments(storedAppointments);
    }, []);

    const handleFeedback = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAppointment) {
            const updatedAppointments = appointments.map(appt =>
                appt.id === selectedAppointment.id
                    ? { ...appt, reviewGiven: true, reviewData: formData }
                    : appt
            );
            setAppointments(updatedAppointments);
            localStorage.setItem('appointmentData', JSON.stringify(updatedAppointments));

            // Reset and close
            setShowModal(false);
            setFormData({ name: '', review: '', rating: 0 });
            setSelectedAppointment(null);
        }
    };

    return (
        <div className="review-form-container">
            <h2>Reviews</h2>
            <table className="review-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Speciality</th>
                        <th>Provide feedback</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={appointment.id}>
                            <td>{index + 1}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.doctorSpeciality}</td>
                            <td>
                                <button
                                    className="feedback-btn"
                                    onClick={() => handleFeedback(appointment)}
                                    disabled={appointment.reviewGiven}
                                >
                                    Click Here
                                </button>
                            </td>
                            <td>{appointment.reviewGiven && appointment.reviewData ? appointment.reviewData.review : ''}</td>
                        </tr>
                    ))}
                    {appointments.length === 0 && (
                        <tr>
                            <td colSpan="5" className="no-appointments">No consultations found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Feedback Modal */}
            <Popup
                open={showModal}
                onClose={() => setShowModal(false)}
                modal
                closeOnDocumentClick
                className="review-popup"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Give Feedback</h3>
                        <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                    </div>
                    <form onSubmit={handleSubmit} className="feedback-form">
                        <div className="form-group">
                            <label>Doctor Name:</label>
                            <p>{selectedAppointment?.doctorName}</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Your Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="review">Review:</label>
                            <textarea
                                id="review"
                                name="review"
                                value={formData.review}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating:</label>
                            <div className="rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= formData.rating ? 'filled' : ''}`}
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="submit-btn" disabled={formData.rating === 0}>Submit</button>
                    </form>
                </div>
            </Popup>
        </div>
    );
};

export default ReviewForm;
