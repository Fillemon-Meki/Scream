import React, { useState } from "react";
import { DashboardOutlined, UserOutlined, EnvironmentOutlined, FileOutlined, AppstoreOutlined, TeamOutlined } from '@ant-design/icons';
import { logo } from "../Assets/index";

const Menubar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: <DashboardOutlined />, link: "/dashboard" },
    { name: "Emergency", icon: <UserOutlined />, link: "/emergency" },
    { name: "Map", icon: <EnvironmentOutlined />, link: "/map" },
    { name: "Report", icon: <FileOutlined />, link: "/report" },
    { name: "Overview", icon: <AppstoreOutlined />, link: "/overview" },
    { name: "Users", icon: <TeamOutlined />, link: "/user-management" },
  ];  
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={logo} alt="Company Logo" style={styles.logo} />
      </div>
      <div style={styles.menu}>
        <div style={styles.menuTitle}>Dashboard Menu</div>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            style={{
              ...styles.menuItem,
              ...(selectedItem === item ? styles.selectedItem : styles.notSelectedItem),
            }}
            onClick={() => handleItemClick(item)}
          >
            {item.icon} {/* Update this line */}
            <span style={{ fontWeight: "bold" }}>{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: "16rem",
    backgroundColor: "#E5E7EB",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "6rem",
  },
  logo: {
    height: "4rem",
    width: "8rem",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  menuTitle: {
    paddingLeft: "2rem",
    color: "#000000",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    paddingTop: "1.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "1rem",
    borderRadius: "0.5rem",
    transition: "background-color 0.3s",
  },
  selectedItem: {
    color: "#3BBF66",
    backgroundColor: "#FFFFFF",
  },
  notSelectedItem: {
    color: "#4B5563",
    "&:hover": {
      color: "#1F2937",
    },
  },
  settings: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "5rem",
    paddingTop: "1.5rem",
  },
  settingsItem: {
    textDecoration: "none",
    fontSize: "1rem",
    color: "#4B5563",
    fontWeight: "bold",
    transition: "color 0.3s",
    "&:hover": {
      color: "#1F2937",
    },
  },
};

export default Menubar;
