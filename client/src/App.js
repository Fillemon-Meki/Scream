import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Login,
  Register,
  Users,
  Map,
  Emergency,
  Report,
  Overview,
  Settings,
} from "./Pages/index";
const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<Users />} />
          <Route path="/map" element={<Map />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/report" element={<Report/>} />
          <Route path="/overview" element={<Overview/>} />
          <Route path="/settings" element={<Settings />} />
          </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
