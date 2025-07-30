import React from "react";
import AdminNavbar from "../nav/AdminNavbar";
import { Outlet } from "react-router-dom";

const layoutStyle = {
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    boxSizing: "border-box",
};

const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />
            <main style={layoutStyle}>
                <Outlet />
            </main>
        </>
    );
};

export default AdminLayout;
