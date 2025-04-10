// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { Bounce, toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../../src/assets/css/addgarage.css"; // Import external CSS

// export const AddGarage2 = () => {
//   const navigate = useNavigate();
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);

//   useEffect(() => {
//     const getAllStates = async () => {
//       const res = await axios.get("/state/getallstates");
//       setStates(res.data.data);
//     };
//     getAllStates();
//   }, []);

//   const getCityByStateId = async (id) => {
//     const res = await axios.get("/city/getcitybystate/" + id);
//     setCities(res.data.data);
//   };

//   const getAreaByCityId = async (id) => {
//     const res = await axios.get("/area/getareabycity/" + id);
//     setAreas(res.data.data);
//   };

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const submitHandler = async (data) => {
//     try {
//       data.userId = localStorage.getItem("id");
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => formData.append(key, data[key]));
//       formData.append("image", data.image[0]);

//       const res = await axios.post("/garage/addgaragewithfile", formData);
//       if (res.status === 200) {
//         toast.success("Garage added successfully!", {
//           position: "top-right",
//           autoClose: 2000,
//           theme: "dark",
//           transition: Bounce,
//           onClose: () => navigate("/garageowner/mygarages"),
//         });
//       }
//     } catch (error) {
//       toast.error("Garage not added!", {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "dark",
//         transition: Bounce,
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <ToastContainer position="top-right" autoClose={2000} theme="dark" transition={Bounce} />
//       <div className="card">
//         <h2 className="title">Add Garage</h2>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <input type="text" placeholder="Garage Name" {...register("name", { required: "Name is required" })} className="input-field" />
//           {errors.name && <p className="error">{errors.name.message}</p>}

//           <input type="text" placeholder="Owner Name" {...register("owner", { required: "Owner name is required" })} className="input-field" />
//           {errors.owner && <p className="error">{errors.owner.message}</p>}

//           <input type="text" placeholder="Phone No" {...register("phoneno", { required: "Contact number is required" })} className="input-field" />
//           {errors.phoneno && <p className="error">{errors.phoneno.message}</p>}

//           <select {...register("stateId")} className="input-field" onChange={(e) => getCityByStateId(e.target.value)}>
//             <option value="">Select State</option>
//             {states.map(state => <option key={state._id} value={state._id}>{state.name}</option>)}
//           </select>

//           <select {...register("cityId")} className="input-field" onChange={(e) => getAreaByCityId(e.target.value)}>
//             <option value="">Select City</option>
//             {cities.map(city => <option key={city._id} value={city._id}>{city.cityName}</option>)}
//           </select>

//           <select {...register("areaId")} className="input-field">
//             <option value="">Select Area</option>
//             {areas.map(area => <option key={area._id} value={area._id}>{area.name}</option>)}
//           </select>

//           <input type="file" {...register("image")} className="input-field file-input" />

//           <button type="submit" className="submit-btn">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Typography,
  Container,
  Grid
} from "@mui/material";

export const AddGarage2 = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const getAllStates = async () => {
      const res = await axios.get("/state/getallstates");
      setStates(res.data.data);
    };
    getAllStates();
  }, []);

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    try {
      data.userId = localStorage.getItem("id");
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      formData.append("image", data.image[0]);

      const res = await axios.post("/garage/addgaragewithfile", formData);
      if (res.status === 200) {
        toast.success("Garage added successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
          onClose: () => navigate("/garageowner/mygarages")
        });
      }
    } catch (error) {
      toast.error(
        error.response
          ? "Garage not added!"
          : "Network error! Please try again later",
        {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce
        }
      );
    }
  };

  return (
    <div style={{backgroundColor:"rgb(220, 225, 245)"}}>
    <Container maxWidth="md" style={{ marginTop: "32px", marginBottom: "32px" }}>
  <ToastContainer
    position="top-right"
    autoClose={2000}
    theme="dark"
    transition={Bounce}
  />
  <Card style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.2)", borderRadius: "16px", padding: "24px" }}>
    <CardContent>
      <Typography
        variant="h5"
        gutterBottom
        style={{ fontWeight: "bold", textAlign: "center", marginBottom: "16px" }}
      >
        Add Garage
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Garage Name"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum three char required"
                }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Owner Name"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("owner", { required: "Owner name is required" })}
              error={!!errors.owner}
              helperText={errors.owner?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone No"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("phoneno", {
                required: "Contact number is required",
                pattern: {
                  value: /[6-9]{1}[0-9]{9}/,
                  message: "Invalid contact number"
                }
              })}
              error={!!errors.phoneno}
              helperText={errors.phoneno?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="State"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("stateId")}
              onChange={(e) => getCityByStateId(e.target.value)}
            >
              <MenuItem value="">Select State</MenuItem>
              {states.map((state) => (
                <MenuItem key={state._id} value={state._id}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="City"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("cityId")}
              onChange={(e) => getAreaByCityId(e.target.value)}
            >
              <MenuItem value="">Select City</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city._id} value={city._id}>
                  {city.cityName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Area"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("areaId")}
            >
              <MenuItem value="">Select Area</MenuItem>
              {areas.map((area) => (
                <MenuItem key={area._id} value={area._id}>
                  {area.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Opening Hours"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("openingHours")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Latitude"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("latitude")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Longitude"
              fullWidth
              style={{ marginBottom: "16px" }}
              {...register("longitude")}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              {...register("image")}
              className="input-field file-input"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                padding: "12px 0",
                fontSize: "16px",
                marginTop: "8px",
                backgroundColor: "rgb(49, 112, 184)"
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  </Card>
</Container>
</div>
  );
};
