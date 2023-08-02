import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const UserChart = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Create the chart data
  const totalUsersChartData = {
    labels: ["Total Users", "Non-active Users"],
    datasets: [
      {
        data: [userData?.totalUsers || 0, (userData?.totalUsers || 0) - (userData?.activeUsers || 0)],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const activeUsersChartData = {
    labels: ["Active Users", "Non-active Users"],
    datasets: [
      {
        data: [userData?.activeUsers || 0, (userData?.totalUsers || 0) - (userData?.activeUsers || 0)],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div>
      <h2>User Statistics</h2>
      {userData ? (
        <>
          <h3>Total Users</h3>
          <Pie data={totalUsersChartData} />
          <h3>Active Users</h3>
          <Pie data={activeUsersChartData} />

          {/* <h3>User Chart</h3>
          <Pie data={chartData} /> */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserChart;
