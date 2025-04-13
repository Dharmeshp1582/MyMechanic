import React, { useState, useEffect } from "react";
import axios from "axios";

export const AddArea = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newPincode, setNewPincode] = useState("");

  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  const showAlert = (message) => {
    alert(message);
  };

  useEffect(() => {
    axios
      .get("/state/getallstates")
      .then((res) => setStates(res.data.data))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  useEffect(() => {
    if (selectedStateId) {
      axios
        .get(`/city/getcitybystate/${selectedStateId}`)
        .then((res) => setCities(res.data.data))
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedStateId]);

  useEffect(() => {
    if (selectedCityId) {
      axios
        .get(`/area/getareabycityid/${selectedCityId}`)
        .then((res) => setAreas(res.data.data))
        .catch((err) => console.error("Error fetching areas:", err));
    }
  }, [selectedCityId]);

  const addState = async () => {
    if (!newState.trim()) return;
    try {
      const res = await axios.post("/state/addstate", { name: newState });
      setStates((prev) => [...prev, res.data.data]);
      setNewState("");
      showAlert("State added successfully!");
    } catch (err) {
      console.error("Error adding state:", err);
    }
  };

  const addCity = async () => {
    if (!newCity.trim() || !selectedStateId) return;
    try {
      const res = await axios.post("/city/addcity", {
        cityName: newCity,
        stateId: selectedStateId,
      });
      setCities((prev) => [...prev, res.data.data]);
      setNewCity("");
      showAlert("City added successfully!");
    } catch (err) {
      console.error("Error adding city:", err);
    }
  };

  const addArea = async () => {
    if (!newArea.trim() || !newPincode.trim() || !selectedCityId) return;
    const selectedCity = cities.find((c) => c._id === selectedCityId);
    if (!selectedCity) return;

    try {
      const res = await axios.post("/area/addarea", {
        name: newArea,
        pincode: newPincode,
        cityId: selectedCityId,
        stateId: selectedCity.stateId,
      });
      setAreas((prev) => [...prev, res.data.data]);
      setNewArea("");
      setNewPincode("");
      showAlert("Area added successfully!");
    } catch (err) {
      console.error("Error adding area:", err);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "30px auto",
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        backgroundColor: "#f2f2f2",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Area Management
      </h2>

      {/* Add State */}
      <div style={{ marginBottom: "25px" }}>
        <h4>Add State</h4>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            style={{ padding: "10px", flex: 1, borderRadius: "6px", border: "1px solid #ccc" }}
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="Enter state name"
          />
          <button
            onClick={addState}
            style={{
              padding: "10px 16px",
              backgroundColor: "rgb(113, 177, 251)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add State
          </button>
        </div>
      </div>

      {/* Select State */}
      <div style={{ marginBottom: "25px" }}>
        <h4>Select State</h4>
        <select
          style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
          value={selectedStateId}
          onChange={(e) => {
            setSelectedStateId(e.target.value);
            setSelectedCityId("");
            setCities([]);
            setAreas([]);
          }}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add City */}
      <div style={{ marginBottom: "25px" }}>
        <h4>Add City</h4>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            style={{ padding: "10px", flex: 1, borderRadius: "6px", border: "1px solid #ccc" }}
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button
            onClick={addCity}
            style={{
              padding: "10px 16px",
              backgroundColor: "rgb(107, 172, 246)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add City
          </button>
        </div>
      </div>

      {/* Select City */}
      <div style={{ marginBottom: "25px" }}>
        <h4>Select City</h4>
        <select
          style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
          value={selectedCityId}
          onChange={(e) => {
            setSelectedCityId(e.target.value);
            setAreas([]);
          }}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c._id} value={c._id}>
              {c.cityName}
            </option>
          ))}
        </select>
      </div>

      {/* Add Area */}
      <div style={{ marginBottom: "25px" }}>
        <h4>Add Area</h4>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            style={{ padding: "10px", flex: "1 1 60%", borderRadius: "6px", border: "1px solid #ccc" }}
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Enter area name"
          />
          <input
            style={{ padding: "10px", flex: "1 1 30%", borderRadius: "6px", border: "1px solid #ccc" }}
            value={newPincode}
            onChange={(e) => setNewPincode(e.target.value)}
            placeholder="Enter pincode"
          />
          <button
            onClick={addArea}
            style={{
              padding: "10px 16px",
              backgroundColor: "rgb(101, 173, 255)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add Area
          </button>
        </div>
      </div>
    </div>
  );
};
