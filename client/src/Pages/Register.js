import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          password,
        }),
      });
      const data = await response.json();
      console.log(data); // Log the response data to the console
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register Users into database</h1>
      <form onSubmit={registerUser}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Full Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            type="text"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="role" style={styles.label}>
            Role
          </label>
          <input
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            type="text"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={styles.registerButton}
          disabled={!name || !email || !role || !password}
        >
          Register
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
  },
  signInLink: {
    textAlign: "center",
    marginTop: "10px",
  },
  signUpLink: {
    color: "blue",
    cursor: "pointer",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  registerButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4caf50",
    border: "none",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  registerButtonHover: {
    backgroundColor: "#45a049",
  },
  registerButtonDisabled: {
    backgroundColor: "#a0a0a0",
    cursor: "not-allowed",
  },
};

export default Register;
