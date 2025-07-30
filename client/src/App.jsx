import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";

import PostJob from "./pages/admin/PostJob";
import ManageJobs from "./pages/admin/ManageJobs";                   // New import
import ManageApplications from "./pages/admin/ManageApplications";   // New import

import BrowseJobs from "./pages/user/BrowseJobs";
import MyApplications from "./pages/user/MyApplications";           // New import

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="post-job" element={<PostJob />} />
                    <Route path="manage-jobs" element={<ManageJobs />} />                       {/* New route */}
                    <Route path="applications" element={<ManageApplications />} />       {/* New route */}
                    {/* Add more admin routes here */}
                </Route>

                {/* User Routes */}
                <Route path="/user" element={<UserLayout />}>
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="jobs" element={<BrowseJobs />} />
                    <Route path="my-applications" element={<MyApplications />} />               {/* New route */}
                    {/* Add more user routes here */}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
