import React, { useState } from 'react';
import axios from 'axios';

export default function PostJob() {
    const [form, setForm] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        salary: ''
    });

    const [message, setMessage] = useState('');

    // Capture JWT token from localStorage (or wherever you store it)
    const token = localStorage.getItem('token'); // adjust if stored differently

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const res = await axios.post('/api/admin/jobs', form, config);

            setMessage(res.data.message);
            setForm({ title: '', company: '', location: '', description: '', salary: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to post job');
        }
    };

    return (
        <>
            <div className="container">
                <h2>Post a New Job</h2>
                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <label>Job Title*</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <label>Company*</label>
                    <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        required
                    />

                    <label>Location*</label>
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                    />

                    <label>Salary</label>
                    <input
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        placeholder="e.g., $50,000 - $60,000"
                    />

                    <label>Job Description*</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows="5"
                    />

                    <button type="submit">Post Job</button>
                </form>
            </div>

            {/* CSS styles scoped in this component */}
            <style jsx>{`
                .container {
                    max-width: 600px;
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

                form {
                    background: #f9f9f9;
                    padding: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 0 8px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                }

                label {
                    font-weight: 600;
                    margin-top: 1rem;
                    margin-bottom: 0.4rem;
                    color: #555;
                }

                input,
                textarea {
                    padding: 10px 12px;
                    border: 1.5px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                    box-sizing: border-box;
                }

                input:focus,
                textarea:focus {
                    border-color: #007bff;
                    outline: none;
                }

                button {
                    margin-top: 1.5rem;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 5px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                button:hover {
                    background-color: #0056b3;
                }

                .message {
                    margin-top: 1rem;
                    padding: 10px;
                    border-radius: 5px;
                    color: #155724;
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    text-align: center;
                }
            `}</style>
        </>
    );
}
