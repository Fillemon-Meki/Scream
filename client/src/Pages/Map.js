import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { EnvironmentOutlined } from "@ant-design/icons"; 
import "leaflet/dist/leaflet.css";
import "../Pages/Map.css";

const Map = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Use a function to get the current location
    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation([latitude, longitude]);
          },
          (error) => {
            console.log("Error getting current location:", error.message);
          }
        );
      } else {
        console.log("Geolocation is not available in this browser.");
      }
    };

    getCurrentLocation();
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const customIcon = new L.divIcon({
    html: ReactDOMServer.renderToString(<EnvironmentOutlined />),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const MapButtons = () => {
    const map = useMap();

    const handleLocationShare = () => {
      // Code to share the current location
      // This can be implemented using a share API or by copying the coordinates to the clipboard
      alert("Share current location functionality");
    };

    const handleGoToCurrentLocation = () => {
      if (currentLocation) {
        map.flyTo(currentLocation, 13);
      }
    };

    const handleSearch = () => {
      // Implement search functionality using the searchQuery state
      alert(`Search for '${searchQuery}'`);
    };

    return (
      <div className="map-buttons">
        <button onClick={handleLocationShare}>Share Location</button>
        <button onClick={handleGoToCurrentLocation}>Go to Current Location</button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-screen text-gray-500 ${
          showMenu ? "" : "hidden"
        } lg:block`}
      >
        <Menubar />
      </div>
      <div className="w-5/6 h-screen relative">
        <Navbar pagename={"Map"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <MapContainer
          center={currentLocation || [-22.562695611931407, 17.070598281752922]} // Use currentLocation if available, else use [0, 0] as default center
          zoom={6}
          style={{ width: "100%", height: "calc(100vh - 64px)" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {currentLocation && (
            <Marker position={currentLocation} icon={customIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
          <MapButtons />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;