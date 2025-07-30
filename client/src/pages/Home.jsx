import React from "react";
import { Link } from "react-router-dom";
import jobBackground from "./job.png"; // Make sure job.png is inside src/pages

const Home = () => {
    return (
        <div style={{
            ...styles.container,
            backgroundImage: `url(${jobBackground})`
        }}>
            <div style={styles.overlay}>
                <h1 style={styles.heading}>Welcome to the Job Portal</h1>
                <p style={styles.subtext}>Find your dream job or the perfect candidate</p>
                <Link to="/login" style={styles.button}>Login</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black overlay
        padding: "40px",
        borderRadius: "12px",
        textAlign: "center",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
    },
    heading: {
        fontSize: "3rem",
        marginBottom: "10px",
        fontWeight: "bold",
    },
    subtext: {
        fontSize: "1.2rem",
        marginBottom: "30px",
    },
    button: {
        padding: "12px 30px",
        fontSize: "1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "8px",
        transition: "background 0.3s",
    },
};

export default Home;
