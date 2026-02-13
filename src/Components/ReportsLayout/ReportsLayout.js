import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportsLayout.css';

const ReportsLayout = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        } else {
            // Fetch reports from localStorage (appointment data that may have associated reports)
            const storedAppointments = JSON.parse(localStorage.getItem("appointmentData") || "[]");
            // Filter or map appointments that have reports
            const reportData = storedAppointments.map((appt, index) => ({
                serialNumber: index + 1,
                doctorName: appt.doctorName || "N/A",
                doctorSpeciality: appt.doctorSpeciality || appt.speciality || "N/A",
                reportAvailable: true,
            }));
            setReports(reportData);
        }
    }, [navigate]);

    return (
        <div className="reports-container">
            <h2>Reports</h2>
            <div className="reports-table-wrapper">
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            <th>View Report</th>
                            <th>Download Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <tr key={report.serialNumber}>
                                    <td>{report.serialNumber}</td>
                                    <td>{report.doctorName}</td>
                                    <td>{report.doctorSpeciality}</td>
                                    <td>
                                        <a
                                            href="/patient_report.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="report-btn view-btn"
                                        >
                                            View Report
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="/patient_report.pdf"
                                            download="patient_report.pdf"
                                            className="report-btn download-btn"
                                        >
                                            Download Report
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-reports">
                                    No reports available. Book a consultation first.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportsLayout;
