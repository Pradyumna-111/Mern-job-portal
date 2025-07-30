// src/pages/admin/ManageApplications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageApplications() {
    const [applications, setApplications] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await axios.get('/api/admin/applications');
            setApplications(res.data);
            setMessage('');
        } catch (error) {
            setMessage('Failed to load applications');
            console.error(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await axios.patch(`/api/admin/applications/${id}`, { status });
            setApplications(apps =>
                apps.map(app => (app._id === id ? res.data.application : app))
            );
            setMessage('Status updated');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to update status');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>User Applications</h2>
            {message && <p style={{ color: message.includes('Failed') ? 'red' : 'green' }}>{message}</p>}

            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                applications.map(app => (
                    <div key={app._id} className="application-card" style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <p><strong>User:</strong> {app.user.name} ({app.user.email})</p>
                        <p><strong>Job:</strong> {app.job.title} @ {app.job.company}</p>
                        <p><strong>Status:</strong> {app.status}</p>
                        {app.resumeUrl && (
                            <p>
                                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
                            </p>
                        )}
                        {app.status === 'Applied' && (
                            <div>
                                <button onClick={() => updateStatus(app._id, 'Accepted')} style={{ marginRight: '1rem' }}>Accept</button>
                                <button onClick={() => updateStatus(app._id, 'Rejected')}>Reject</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
