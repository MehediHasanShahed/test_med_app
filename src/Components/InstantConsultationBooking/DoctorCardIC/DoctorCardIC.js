import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC'
import { v4 as uuidv4 } from 'uuid';


const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = JSON.parse(localStorage.getItem('instantAppointmentData')) || [];
    const doctorAppointments = getAppointments.filter(appointment => appointment.doctorName === name);
    setAppointments(doctorAppointments);
  }, [name]);


  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);

    // Update localStorage (Global)
    const storedAppointments = JSON.parse(localStorage.getItem('instantAppointmentData')) || [];
    const updatedStoredAppointments = storedAppointments.filter((appointment) => appointment.id !== appointmentId);
    localStorage.setItem('instantAppointmentData', JSON.stringify(updatedStoredAppointments));

    // Dispatch custom event
    window.dispatchEvent(new Event('instantAppointmentChange'));
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
      doctorName: name, // Store doctor name to distinguish
      doctorSpeciality: speciality
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);

    // Persist to localStorage (Global)
    const storedAppointments = JSON.parse(localStorage.getItem('instantAppointmentData')) || [];
    const updatedStoredAppointments = [...storedAppointments, newAppointment];
    localStorage.setItem('instantAppointmentData', JSON.stringify(updatedStoredAppointments));

    // We do NOT update 'doctorData' here, so it won't affect the main Notification component which is for Booking Consultation
    // localStorage.setItem('doctorData', JSON.stringify({ name, speciality })); 

    // Dispatch custom event
    window.dispatchEvent(new Event('instantAppointmentChange'));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>


      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
          contentStyle={{
            width: '500px',
            background: '#fff',
            borderRadius: '20px',
            padding: '0',
            border: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: '2000'
          }}
          overlayStyle={{
            background: 'rgba(0,0,0,0.5)',
            zIndex: '1999'
          }}
        >
          {(close) => (
            <div className="doctorbg" style={{ overflow: 'auto', padding: '20px' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCardIC;
