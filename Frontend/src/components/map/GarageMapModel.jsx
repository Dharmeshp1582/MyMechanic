import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GarageMapModal = ({ garage, onClose }) => {
  const center = {
    lat: garage.latitude,
    lng: garage.longitude,
  };

  return (
    <div className="map-overlay">
      <div className="map-container">
        <button className="map-close-btn" onClick={onClose}>✖ Close</button>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={{ width: '100%', height: '400px' }} center={center} zoom={15}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${garage.latitude},${garage.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="get-directions-btn"
        >
          🧭 Get Directions
        </a>
      </div>
    </div>
  );
};

export default GarageMapModal;
