import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import GroupIcon from '@material-ui/icons/Group';
import MapIcon from '@material-ui/icons/Map';
import WarningIcon from '@material-ui/icons/Warning';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ReportIcon from '@material-ui/icons/Report';


function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <Link to="/dashboard">
            <DashboardIcon />
            <span className="sidebar-item-text">Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/users">
            <PeopleIcon />
            <span className="sidebar-item-text">Users</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/community">
            <GroupIcon />
            <span className="sidebar-item-text">Community</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/map">
            <MapIcon />
            <span className="sidebar-item-text">Map</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/emergency">
            <WarningIcon />
            <span className="sidebar-item-text">Emergency</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/overview">
            <AssessmentIcon />
            <span className="sidebar-item-text">Overview</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/reports">
            <ReportIcon />
            <span className="sidebar-item-text">Reports</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
