import React, { useState, useEffect } from "react";
import axios from "axios";
import { demouser, logout } from "../Assets/index";

const Navbar = ({ pagename }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState); // Toggle the showDropdown state
  };

  return (
    <nav style={styles.nav}>
      <div>
        <h1 style={styles.title}>{pagename}</h1>
      </div>
      <div style={{ position: "relative" }}>
        {userInfo ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <button style={styles.avatarButton} onClick={toggleDropdown}>
              <img src={demouser} alt="avatar" style={styles.avatarImage} />
            </button>
            {showDropdown && (
              
              <div style={styles.dropdown}>
               <div style={{ display: "flex", flexDirection: "column", fontSize: "20rem", marginLeft: "0.5rem" }}>
              <span style={styles.userName}>{userInfo.name}</span>
              <span style={styles.userEmail}>{userInfo.email}</span>
            </div>
                <a href="/" style={styles.dropdownItem}>
                  Profile
                </a>
                <div style={styles.settings}>
                 <a href="/Settings" style={styles.settingsItem}>
                   Settings
                   </a>
                  </div>
                <div
                   style={styles.logoutButton}
                   onClick={() => {
                   window.location.href = "/";
                   }}>
           <img src={logout} alt="Logout" style={styles.logoutIcon} />
           <span style={styles.logoutText}>Logout</span>
      </div>
              </div>
            )}
          </div>
        ) : (
          <span style={styles.loading}>Loading user information...</span>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "5rem",
    padding: "0 2rem",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#4B5563",
  },
  avatarButton: {
    backgroundColor: "#D1D5DB",
    borderRadius: "50%",
    height: "2.5rem",
    width: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "1rem",
    outline: "none",
    border: "none",
    cursor: "pointer",
  },
  avatarImage: {
    borderRadius: "50%",
    height: "2rem",
    width: "2rem",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "100%",
    marginTop: "0.5rem",
    width: "12rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  },
  dropdownItem: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    color: "#4B5563",
    textDecoration: "none",
    display: "block",
  },
  settings: {
    backgroundColor: "#F3F4F6",
    borderBottom: "1px solid #E5E7EB",
    padding: "0.5rem 1rem",
  },
  settingsItem: {
    fontSize: "0.875rem",
    color: "#6B7280",
    textDecoration: "none",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "4rem",
    cursor: "pointer",
    color: "#EF4444",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#FECACA",
    },
  },
  logoutIcon: {
    height: "1.5rem",
    width: "1.5rem",
    marginRight: "0.75rem",
  },
  logoutText: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  userName: {
    fontWeight: "bold",
    color: "#000000",
    marginBottom: "0.25rem",
  },
  userEmail: {
    color: "#6B7280",
  },
  loading: {
    color: "#6B7280",
  },
};


export default Navbar;

