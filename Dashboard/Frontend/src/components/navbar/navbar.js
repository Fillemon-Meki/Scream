import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, InputBase, Menu, MenuItem } from "@material-ui/core";
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon
} from "@material-ui/icons";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleLogout() {
    navigate("/");
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleProfileMenuClose() {
    setAnchorEl(null);
  }

  const isProfileMenuOpen = Boolean(anchorEl);

  return (
    <div className="navbar">
      <div className="navbar-logo">SCREAM</div>
      <div className="navbar-search">
        <div className="search-icon">
          <IconButton color="inherit" type="submit" aria-label="Search">
            <SearchIcon />
          </IconButton>
        </div>
        <InputBase placeholder="Search" />
      </div>
      <div className="navbar-icons">
        <IconButton className="navbar-icon">
          <SettingsIcon />
        </IconButton>
        <IconButton  className="navbar-icon">
          <NotificationsIcon />
        </IconButton>
        <div className="navbar-icon">
          <IconButton
            onClick={handleProfileMenuOpen}
            aria-haspopup="true"
            aria-label="Profile"
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
            keepMounted
          >
            <MenuItem>Manage Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
