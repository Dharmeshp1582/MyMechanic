

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px"
};

const center = {
  lat: 23.034094670278527, // Replace with your location
  lng: 72.56015198150922,
};

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC7d-o3Wq0W2fPLr6KcWNz5SS2QbwTtvhQ", // Replace with your actual API key
  });

return (
    <>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
                <Marker position={center} />
        </GoogleMap>
      ) : (
        <p className="text-center text-gray-500">Loading Map...</p>
      )}
    </>
  );

};

export default MapComponent;