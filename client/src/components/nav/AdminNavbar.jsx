import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token or session (based on your app logic)
        localStorage.removeItem("token"); // or sessionStorage.clear()
        // Optionally clear other state: user info, role, etc.
        // Redirect to login page
        navigate("/login");
    };

    const navStyle = {
        backgroundColor: "#1f2937",
        color: "#ffffff",
        padding: "12px 24px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    };

    const ulStyle = {
        display: "flex",
        gap: "20px",
        alignItems: "center",
        listStyle: "none",
        margin: 0,
        padding: 0,
        fontSize: "14px",
        fontWeight: "500",
    };

    const linkStyle = {
        color: "white",
        textDecoration: "none",
        padding: "6px 10px",
        borderRadius: "4px",
        transition: "background-color 0.2s ease",
        cursor: "pointer",
    };

    const rightAlignStyle = {
        marginLeft: "auto",
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li><Link style={linkStyle} to="/admin/dashboard">Dashboard</Link></li>
                <li><Link style={linkStyle} to="/admin/manage-users">Manage Users</Link></li>
                <li><Link style={linkStyle} to="/admin/manage-jobs">Manage Jobs</Link></li>
                <li><Link style={linkStyle} to="/admin/post-job">Post Job</Link></li>
                <li><Link style={linkStyle} to="/admin/applications">Applications</Link></li>
                <li style={rightAlignStyle}>
                    <span style={linkStyle} onClick={handleLogout}>Logout</span>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;
