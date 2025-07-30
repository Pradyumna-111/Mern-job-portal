// src/pages/user/MyApplications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');

    const fetchApplications = async () => {
        if (!userId) {
            setMessage('Please enter your User ID');
            setApplications([]);
            return;
        }
        try {
            const res = await axios.get(`/api/my-applications?userId=${userId}`);
            setApplications(res.data);
            setMessage('');
        } catch (error) {
            setMessage('Failed to load applications');
            console.error(error);
            setApplications([]);
        }
    };

    useEffect(() => {
        // Optionally fetch when userId changes, or add a button to trigger fetch
    }, [userId]);

    return (
        <div className="container">
            <h2>My Applications</h2>
            <input
                placeholder="Enter your User ID"
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                style={{ marginBottom: '1rem', padding: '8px', width: '300px' }}
            />
            <button onClick={fetchApplications}>Load Applications</button>

            {message && <p style={{ color: 'red' }}>{message}</p>}

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
                        <h3>{app.job.title}</h3>
                        <p><strong>Company:</strong> {app.job.company}</p>
                        <p><strong>Status:</strong> {app.status}</p>
                        {app.resumeUrl && (
                            <p>
                                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
                            </p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
