import React, { useState, useEffect } from "react";
import axios from "axios";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";

const UserContactPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  // Function to get the token from local storage
  const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); //check the token value
    return token;
  };
  

  // Axios configuration with the token
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
  
    fetchUsers(); // Call the function inside useEffect
  }, []);

  const handleSelectUser = async (user) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/contacts`, config);
      const contacts = response.data.data;
      const userContacts = contacts.filter((contact) => contact.user === user._id);
      setSelectedUser({ ...user, contacts: userContacts });
    } catch (error) {
      console.log("Error fetching contacts:", error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${contactId}`, config);
      setSelectedUser({
        ...selectedUser,
        contacts: selectedUser.contacts.filter((contact) => contact._id !== contactId),
      });
    } catch (error) {
      console.log("Error deleting contact:", error);
    }
  };

  const handleAddContact = async (event) => {
    event.preventDefault();

    if (!name || !number) {
      setErrorMessage("Name and phone number are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contacts", {
        name,
        number,
        user: selectedUser._id,
      }, config);

      const response = await axios.get(`http://localhost:5000/api/contacts`, config);
      const contacts = response.data.data;
      const userContacts = contacts.filter((contact) => contact.user === selectedUser._id);
      setSelectedUser({ ...selectedUser, contacts: userContacts });
      setName("");
      setNumber("");
      setErrorMessage("");
    } catch (error) {
      console.log("Error adding contact:", error);
    }
  };

  const handleUpdateContact = async (contactId, newName, newNumber) => {
    try {
      await axios.put(`http://localhost:5000/api/contacts/${contactId}`, {
        name: newName,
        number: newNumber,
      }, config);

      const response = await axios.get(`http://localhost:5000/api/contacts`, config);
      const contacts = response.data.data;
      const userContacts = contacts.filter((contact) => contact.user === selectedUser._id);
      setSelectedUser({ ...selectedUser, contacts: userContacts });
    } catch (error) {
      console.log("Error updating contact:", error);
    }
  };

  return (
    <div className="flex" style={{ fontFamily: "Arial, sans-serif" }}>
      <div
        className={`w-1/4 h-screen text-gray-500 ${showMenu ? "" : "hidden"} lg:block`}
      >
        <Menubar />
      </div>
      <div className="w-5/6 h-screen">
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <Navbar pagename={"Overview"} />

        <div style={{ padding: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Users</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {users.map((user) => (
              <li
                key={user._id}
                style={{
                  cursor: "pointer",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "0.5rem",
                }}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        {selectedUser && (
          <div style={{ padding: "1rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Contacts</h2>
            <form
              onSubmit={handleAddContact}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
              }}
            >
              <div style={{ marginBottom: "0.5rem" }}>
                <label style={{ fontWeight: "bold" }}>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <label style={{ fontWeight: "bold" }}>Phone Number:</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <button
                  type="submit"
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add Contact
                </button>
                {errorMessage && (
                  <p style={{ color: "red", marginTop: "0.5rem" }}>{errorMessage}</p>
                )}
              </div>
            </form>
            {selectedUser.contacts.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {selectedUser.contacts.map((contact) => (
                  <li
                    key={contact._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span>
                      {contact.name} - {contact.number}
                    </span>
                    <div>
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
                        style={{
                          padding: "0.3rem 0.5rem",
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginRight: "0.5rem",
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          const newName = prompt("Enter the new name:", contact.name);
                          const newNumber = prompt(
                            "Enter the new phone number:",
                            contact.number
                          );
                          if (newName && newNumber) {
                            handleUpdateContact(contact._id, newName, newNumber);
                          }
                        }}
                        style={{
                          padding: "0.3rem 0.5rem",
                          background: "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No contacts found for this user.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserContactPage;
