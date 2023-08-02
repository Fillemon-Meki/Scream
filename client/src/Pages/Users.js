import React, { useState } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
import UsersTable from "../Components/Table";
import Register from "../Pages/Register";

const UserManagement = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
       <div className={`w-1/5  h-screen text-gray-500 ${showMenu ? "" : "hidden"} lg:block`}>
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <Navbar pagename={"User Management"} />
        <div>
          <UsersTable />
        </div>
        <div>
        <Register />
         </div>
      </div>
    </div>
  );
};

export default UserManagement;
