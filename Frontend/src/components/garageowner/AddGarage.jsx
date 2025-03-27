import { useEffect, useState } from "react";
import "../../assets/css/addgarage.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const AddGarage = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

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
    formState: { errors }
  } = useForm();
  console.log(errors);

  const submitHandler = async (data) => {
    try {
      const userId = localStorage.getItem("id");
      data.userId = userId;
      const res = await axios.post("/garage/addgarage", data);
      toast.success("Garage added successfully!",{position: "top-right"});
      console.log(res.data);
    } catch (error) {
      toast.error("Failed to add garage.",{position: "top-right"});
    }
  };


  const validationSchema = {
    nameValidator: {
      required: { value: true, message: "Name is required" },
      minLength: { value: 3, message: "Minimum three char required" }
    },

    emailValidator: {
      required: { value: true, message: "Email is required" }
    },
    phoneValidator: {
      required: { value: true, message: "Contact number is required" },
      pattern: {
        value: /[6-9]{1}[0-9]{9}/,
        message: "Contact is not valid"
      }
    }
  };

  return (
    <div className="addgarage-container">
      <div className="addgarage-wrapper">
        <div className="addgarage-card">
          <div className="addgarage-header">Add Garage</div>
          <form
            className="addgarage-form"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="addgarage-form-group">
              <label className="addgarage-label">Garage Name</label>
              <input
                type="text"
                {...register("name", validationSchema.nameValidator)}
                className="addgarage-input"
              />
              <span className="addgarage-error">{errors.name?.message}</span>
            </div>
            <div className="addgarage-form-group">
              <label className="addgarage-label">Owner Name</label>
              <input
                type="text"
                {...register("owner", validationSchema.nameValidator)}
                className="addgarage-input"
              />
              <span className="addgarage-error">{errors.owner?.message}</span>
            </div>
            <div className="addgarage-form-group">
              <label className="addgarage-label">Phone No</label>
              <input
                type="text"
                {...register("phoneno", validationSchema.phoneValidator)}
                className="addgarage-input"
              />
              <span className="addgarage-error">{errors.phoneno?.message}</span>
            </div>
            <div className="addgarage-form-group">
              <label className="addgarage-label">Email</label>
              <input
                type="text"
                {...register("email", validationSchema.emailValidator)}
                className="addgarage-input"
              />
              <span  className="addgarage-error">{errors.email?.message}</span>
            </div>
            <div className="addgarage-form-group">
              <label className="addgarage-label">Select State</label>
              <select
                {...register("stateId")}
                className="addgarage-select"
                onChange={(event) => getCityByStateId(event.target.value)}
              >
                <option>Select State</option>
                {states?.map((state) => (
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
                onChange={(event) => getAreaByCityId(event.target.value)}
              >
                <option>Select City</option>
                {cities?.map((city) => (
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
                {areas?.map((area) => (
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
            <div className="addgarage-submit-container">
              <input
                type="submit"
                value="Submit"
                className="addgarage-submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
