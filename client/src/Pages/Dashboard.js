
import React, { useState, useEffect } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
import Card from "../Components/Dashboard-card";
import { reedem, service, users, revenue } from "../Assets/index";
import ChartComponent from "../Components/Chart";
// import totalUsers from "../Components/Table";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [totalUsers, settotalUsers] = useState(0); // Add userCount state

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    // Fetch the user count from the database through an API call
    fetch("https://192.168.178.90/users/count")
      .then((response) => response.json())
      .then((data) => {
        settotalUsers(data.count);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className={`w-1/5 h-auto h-screen text-gray-500 ${showMenu ? "" : "hidden"} lg:block`}>
          <Menubar />
        </div>
        <div className="flex-1 sm:relative overflow-y-auto">
          <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
          <div className="h-16 bg-white shadow-md">
            <Navbar pagename={"Dashboard"} />
          </div>
          <div className="flex flex-wrap justify-between mt-10 mx-4 sm:justify-start">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={"350K"}
                subtitle={"Total revenue "}
                icon={revenue}
                color={"bg-gradient-to-r from-cyan-500 to-blue-500"}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={"1.5K"}
                subtitle={"Reward Points redeemed"}
                icon={reedem}
                color={"bg-gradient-to-r from-purple-500 to-pink-500"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={"1.2K"}
                subtitle={"Emergency calls"}
                icon={service}
                color={"bg-gradient-to-r from-amber-400 to-amber-600"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={totalUsers} // Use userCount state here
                subtitle={"Total Users"}
                icon={users}
                color={"bg-gradient-to-r from-lime-400 to-lime-600"}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-between w-full px-2 mb-4">
              <ChartComponent
                heading="Total Active Users"
                fields={[
                  {
                    name: "Today's active users",
                    value: 300,
                  },
                  {
                    name: "Yesterday's active users",
                    value: 50,
                  },
                  {
                    name: "Tomorrow's active users",
                    value: 100,
                  },
                  {
                    name: "Last Month's active users",
                    value: 150,
                  },
                ]}
              />
              <ChartComponent
                heading="Total Active bookings"
                fields={[
                  {
                    name: "Today's active bookings",
                    value: 300,
                  },
                  {
                    name: "Yesterday's active bookings",
                    value: 50,
                  },
                  {
                    name: "Tomorrow's active bookings",
                    value: 100,
                  },
                  {
                    name: "Last Month's active bookings",
                    value: 150,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
