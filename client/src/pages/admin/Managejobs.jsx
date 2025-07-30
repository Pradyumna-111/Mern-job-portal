import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get('/api/jobs');
            setJobs(res.data);
            setMessage('');
        } catch (error) {
            setMessage('Failed to load jobs');
            console.error(error);
        }
    };

    const deleteJob = async (id) => {
        try {
            await axios.delete(`/api/admin/jobs/${id}`);
            setJobs(jobs.filter(job => job._id !== id));
            setMessage('Job deleted successfully');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to delete job');
            console.error(error);
        }
    };

    return (
        <>
            <div className="container">
                <h2>Manage Jobs</h2>
                {message && <p className="message">{message}</p>}
                <div className="jobs-grid">
                    {jobs.length === 0 ? (
                        <p>No jobs available.</p>
                    ) : (
                        jobs.map(job => (
                            <div key={job._id} className="job-card">
                                <h3>{job.title}</h3>
                                <h4>{job.company}</h4>
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Salary:</strong> {job.salary || 'Negotiable'}</p>
                                <p>{job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description}</p>
                                <button onClick={() => deleteJob(job._id)}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Styles scoped to this component */}
            <style>{`
        .container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: Arial, sans-serif;
          color: #333;
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #222;
          font-weight: 600;
          text-align: center;
        }

        .message {
          color: red;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
        }

        .jobs-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .job-card {
          background: white;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          width: 280px;
          box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: box-shadow 0.3s ease;
        }

        .job-card:hover {
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }

        .job-card h3 {
          margin: 0 0 0.25rem 0;
          font-weight: 700;
          color: #007bff;
        }

        .job-card h4 {
          margin: 0 0 0.8rem 0;
          font-weight: 600;
          color: #333;
        }

        .job-card p {
          font-size: 0.9rem;
          line-height: 1.3;
          color: #555;
          margin-bottom: 0.5rem;
        }

        .job-card p strong {
          color: #333;
        }

        .job-card button {
          align-self: flex-start;
          padding: 8px 16px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: auto;
        }

        .job-card button:hover {
          background-color: #a71d2a;
        }

        @media (max-width: 600px) {
          .job-card {
            width: 95%;
          }
        }
      `}</style>
        </>
    );
}
