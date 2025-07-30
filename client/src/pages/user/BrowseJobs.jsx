import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BrowseJobs() {
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [userId, setUserId] = useState(''); // You need to set userId manually here

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get('/api/jobs');
            setJobs(res.data);
            setMessage('');
        } catch (err) {
            setMessage('Failed to load jobs');
            console.error(err);
        }
    };

    const applyToJob = async () => {
        if (!resumeFile) {
            setMessage('Please upload a resume');
            return;
        }
        if (!userId) {
            setMessage('Please enter your User ID before applying');
            return;
        }

        const formData = new FormData();
        formData.append('jobId', selectedJob._id);
        formData.append('userId', userId);
        formData.append('resume', resumeFile);

        try {
            await axios.post('/api/apply', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Application submitted successfully!');
            setSelectedJob(null);
            setResumeFile(null);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to apply for job');
            console.error(error);
        }
    };

    return (
        <>
            <div className="container">
                <h2>Browse Jobs</h2>
                <p>Enter your User ID to apply for jobs (since no auth).</p>
                <input
                    placeholder="Your User ID"
                    type="text"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    className="userIdInput"
                />
                {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}

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
                                <button onClick={() => setSelectedJob(job)}>Apply</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {selectedJob && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Apply for: {selectedJob.title}</h3>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={e => setResumeFile(e.target.files[0])}
                            className="fileInput"
                        />
                        <div className="modalButtons">
                            <button onClick={applyToJob} className="submitBtn">Submit Application</button>
                            <button onClick={() => { setSelectedJob(null); setResumeFile(null); setMessage(''); }} className="cancelBtn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Scoped CSS */}
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

                p {
                    font-size: 1rem;
                }

                .userIdInput {
                    padding: 8px 12px;
                    width: 300px;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    border: 1.5px solid #ccc;
                    border-radius: 4px;
                    transition: border-color 0.3s ease;
                    box-sizing: border-box;
                }
                .userIdInput:focus {
                    border-color: #007bff;
                    outline: none;
                }

                .message {
                    font-weight: 600;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                .success {
                    color: #155724;
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    padding: 10px;
                    border-radius: 5px;
                }
                .error {
                    color: #721c24;
                    background-color: #f8d7da;
                    border: 1px solid #f5c6cb;
                    padding: 10px;
                    border-radius: 5px;
                }

                .jobs-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    justify-content: center;
                }

                .job-card {
                    background: white;
                    border: 1.5px solid #ddd;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
                    border-radius: 8px;
                    padding: 1.25rem;
                    width: 280px;
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
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    margin-top: auto;
                }

                .job-card button:hover {
                    background-color: #0056b3;
                }

                /* Modal styles */
                .modal {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    width: 90vw;
                    max-width: 400px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    display: flex;
                    flex-direction: column;
                }

                .fileInput {
                    margin-bottom: 1rem;
                    padding: 6px;
                }

                .modalButtons {
                    display: flex;
                    justify-content: flex-start;
                    gap: 1rem;
                }

                .submitBtn {
                    background-color: #28a745;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .submitBtn:hover {
                    background-color: #1e7e34;
                }

                .cancelBtn {
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .cancelBtn:hover {
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
