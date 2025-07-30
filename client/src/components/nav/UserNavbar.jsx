import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="user-navbar">
            <ul className="nav-list">
                <li><Link to="/user/dashboard">Dashboard</Link></li>
                <li><Link to="/user/jobs">Browse Jobs</Link></li>
                <li><Link to="/user/my-applications">My Applications</Link></li>
                <li><Link to="/user/resume-builder">Resume Builder</Link></li>
                <li><Link to="/user/skills">Skills</Link></li>
                <li style={{ marginLeft: "auto" }}>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default UserNavbar;
