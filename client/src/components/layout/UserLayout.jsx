import React from "react";
import UserNavbar from "../nav/UserNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <>
            <style>
                {`
                    .user-navbar {
                        background-color: #003366;
                        padding: 10px 20px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }

                    .nav-list {
                        display: flex;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        align-items: center;
                        gap: 15px;
                    }

                    .nav-list li a {
                        color: white;
                        text-decoration: none;
                        font-size: 14px;
                        font-weight: 500;
                    }

                    .nav-list li a:hover {
                        text-decoration: underline;
                    }

                    .logout-button {
                        background: transparent;
                        border: 1px solid white;
                        color: white;
                        padding: 5px 10px;
                        cursor: pointer;
                        font-size: 14px;
                    }

                    .logout-button:hover {
                        background-color: white;
                        color: #003366;
                    }
                `}
            </style>

            <UserNavbar />
            <div style={{ padding: "1rem" }}>
                <Outlet />
            </div>
        </>
    );
};

export default UserLayout;
