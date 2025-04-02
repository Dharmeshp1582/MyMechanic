import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export const ViewServiceDetail = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    axios.get(`/service/getservicebyid/${id}`)
      .then(response => {
        if (response?.data?.success && response?.data?.data) {
          const responseData = response.data.data;
          setServices(Array.isArray(responseData) ? responseData : [responseData]);
        } else {
          setError(response?.data?.message || 'Service not found');
        }
      })
      .catch(() => setError("Failed to load service details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: 'center', color: 'red' }}>{error}</h2>;
  if (!services.length) return <h2 style={{ textAlign: 'center' }}>Service Not Found</h2>;

  return (
    <div style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'center', marginTop: '80px'}}>
      {services.map((service, index) => (
        <div key={index} style={{
          width: '600px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          border:"2px solid black" 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ marginBottom: '10px', color: '#333' }}>{service?.name || "N/A"}</h2>
              <p style={{ color: '#555' }}>{service?.description || "No description available"}</p>
              <p style={{ fontWeight: 'bold', color: '#222' }}>Price: ₹{service?.price || "N/A"}</p>
              <p style={{ fontWeight: 'bold', color: '#222' }}>Category: {service?.category || "Unknown"}</p>
              <p style={{ fontWeight: 'bold', color: '#222' }}>Duration: {service?.duration ? `${service.duration} mins` : "N/A"}</p>
              <p style={{ fontWeight: 'bold', color: '#222' }}>Ratings: ⭐ {service?.ratings ? `${service.ratings}/5` : "No ratings yet"}</p>
              {service?.features?.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  <h4>Features:</h4>
                  <ul style={{ paddingLeft: '20px' }}>
                    {service.features.map((feature, i) => <li key={i}>{feature}</li>)}
                  </ul>
                </div>
              )}
            </div>
            <img 
              src={service?.imageURL || '/default-image.jpg'} 
              alt={service?.name || "Service Image"} 
              style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '10px', marginLeft: '20px' }}
            />
          </div>
          <button onClick={()=>navigate('/user/booking')} style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            alignSelf: 'center'
          }}>Book Appointment Now</button>
        </div>
      ))}
    </div>
  );
};
