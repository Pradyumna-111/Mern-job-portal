import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [role, setRole] = useState("user");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                const res = await axios.post("/api/register", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role,
                });
                alert("Registration successful! Please login.");
                setIsRegister(false);
                setFormData({ name: "", email: "", password: "" });
            } else {
                const res = await axios.post("/api/login", {
                    email: formData.email,
                    password: formData.password,
                    role,
                });

                const { token, user } = res.data;
                localStorage.setItem("token", token);

                alert("Login successful!");

                // Redirect to appropriate dashboard
                if (user.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/dashboard");
                }
            }
        } catch (error) {
            console.error("Auth Error:", error);
            alert("Authentication failed: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2>{isRegister ? "Register" : "Login"}</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {isRegister && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <label style={styles.label}>Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={styles.select}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit" style={styles.button}>
                        {isRegister ? "Register" : "Login"} as {role}
                    </button>
                </form>

                <p style={styles.toggle}>
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span onClick={() => setIsRegister(!isRegister)} style={styles.link}>
                        {isRegister ? "Login here" : "Register here"}
                    </span>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "100vh",
        backgroundColor: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
    },
    select: {
        padding: "10px",
        fontSize: "16px",
    },
    label: {
        textAlign: "left",
        fontSize: "14px",
        fontWeight: "bold",
    },
    button: {
        padding: "12px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        fontSize: "16px",
        borderRadius: "6px",
        cursor: "pointer",
    },
    toggle: {
        marginTop: "20px",
        fontSize: "14px",
    },
    link: {
        color: "#007bff",
        cursor: "pointer",
        textDecoration: "underline",
    },
};

export default Login;
