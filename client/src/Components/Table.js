import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Table } from "antd";
import { EyeOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Column } = Table;

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      const userData = response.data.data;
      setUsers(userData);
      setTotalUsers(userData.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      setTotalUsers((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, { status: "updated" });
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, status: "updated" } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div style={{ margin: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: "25%", marginRight: "1rem" }}>
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>
      <p>Total Users: {totalUsers}</p>
      <Table dataSource={filteredUsers}>
        <Column title="#" dataIndex="_id" key="_id" render={(text, record, index) => index + 1} />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={() => <CheckCircleOutlined style={{ fontSize: "1.2rem", marginRight: "0.5rem" }} />}
        />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <EyeOutlined
                onClick={() => handleUpdateStatus(record._id)}
                style={{ fontSize: "1.2rem", cursor: "pointer" }}
              />
              <DeleteOutlined
                onClick={() => handleDelete(record._id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default UsersTable;
