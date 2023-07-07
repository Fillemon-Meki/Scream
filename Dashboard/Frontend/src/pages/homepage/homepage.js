import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import Dashboard from '../Dashboard/dashboard';
import Users from '../Users/users';
import Community from '../Community/community';
import Map from '../Map/map';
import Emergency from '../Emergency/emergency';
import Overview from '../Overview/overview';
import Reports from '../Reports/reports';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/community" element={<Community />} />
        <Route path="/map" element={<Map />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
};

export default Homepage;
