import { useEffect, useState } from "react";
import "../../assets/css/addgarage.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateMyGarage = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: async () => {
      const res = await axios.get("/garage/getgaragebyid/" + id);
      return res.data.data;
    }
  });

  const submitHandler = async (data) => {
    try {
      const userId = localStorage.getItem("id");
      data.userId = userId;
      delete data._id;

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await axios.put(
        `/garage/updategaragewithfile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.status === 200) {
        toast.success("Garage updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
          onClose: () => navigate("/garageowner/mygarages")
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating garage", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        transition={Bounce}
      />
      <div className="addgarage-container">
        <div className="addgarage-wrapper">
          <div className="addgarage-card">
          <div>
    <button onClick={() => navigate(-1)} className="book-app-go-back-button">
        ← Go Back
      </button>
      </div>
            <div className="addgarage-header">Update Garage</div>
            <form
              className="addgarage-form"
              onSubmit={handleSubmit(submitHandler)}
            >
              <div className="addgarage-form-group">
                <label className="addgarage-label">Garage Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="addgarage-input"
                />
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Owner Name</label>
                <input
                  type="text"
                  {...register("owner")}
                  className="addgarage-input"
                />
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Phone No</label>
                <input
                  type="text"
                  {...register("phoneno")}
                  className="addgarage-input"
                />
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Email</label>
                <input
                  type="text"
                  {...register("email")}
                  className="addgarage-input"
                />
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Select State</label>
                <select
                  {...register("stateId")}
                  className="addgarage-select"
                  onChange={(e) => getCityByStateId(e.target.value)}
                >
                  <option>Select State</option>
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Select City</label>
                <select
                  {...register("cityId")}
                  className="addgarage-select"
                  onChange={(e) => getAreaByCityId(e.target.value)}
                >
                  <option>Select City</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Select Area</label>
                <select {...register("areaId")} className="addgarage-select">
                  <option>Select Area</option>
                  {areas.map((area) => (
                    <option key={area._id} value={area._id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Opening Hours</label>
                <input
                  type="text"
                  {...register("openingHours")}
                  className="addgarage-input"
                />
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Latitude</label>
                <input
                  type="text"
                  {...register("latitude")}
                  className="addgarage-input"
                />
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Longitude</label>
                <input
                  type="text"
                  {...register("longitude")}
                  className="addgarage-input"
                />
              </div>
              <div className="addgarage-form-group">
                <label className="addgarage-label">Upload New Image</label>
                <input
                  type="file"
                  className="addgarage-input"
                  {...register("image")}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
              <div className="addgarage-submit-container">
                <button type="submit" className="addgarage-submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
