import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../../src/assets/css/addservice.css";


export const AddServices = () => {
  const navigate = useNavigate();
  const [availableServices, setAvailableServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/service/getservicesbyuserid/" + localStorage.getItem("id"))
      .then((response) => {
        setAvailableServices(response.data.data);
      })
      .catch((err) => {
        setError("Failed to fetch available services", err);
      });
  }, []);

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
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await axios.post("/service/addservicewithfile", formData);
      if (res.status === 200) {
        toast.success("Service added successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
          onClose: () => navigate("/garageowner/availableservice")
        });
      }
    } catch (error) {
      toast.error(
        error.response
          ? "Service not added!"
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
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
    <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        transition={Bounce}
      />
      <h1>Add Service</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          maxWidth: "600px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        {errors.name && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.name.message}
          </p>
        )}

        <input
          {...register("description", { required: "Description is required" })}
          placeholder="Description"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        {errors.description && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.description.message}
          </p>
        )}

        <input
          {...register("category", { required: "Category is required" })}
          placeholder="Category"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        {errors.category && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.category.message}
          </p>
        )}

        <input
          type="number"
          {...register("price", { required: "Price is required", min: 1 })}
          placeholder="Price"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        {errors.price && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.price.message}
          </p>
        )}

        <input
          type="number"
          {...register("duration", {
            required: "Duration is required",
            min: 1
          })}
          placeholder="Duration (mins)"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        {errors.duration && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.duration.message}
          </p>
        )}

        <input
          type="file"
          {...register("image", { required: "Image is required" })}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor: "#fff"
          }}
        />
        {errors.image && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.image.message}
          </p>
        )}

        <input
          type="number"
          step="0.1"
          {...register("ratings", {
            required: "Ratings are required",
            min: 0,
            max: 5
          })}
          placeholder="Ratings (0-5)"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        {errors.ratings && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.ratings.message}
          </p>
        )}

        {/* Checkbox for Availability */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%"
          }}
        >
          <input
            type="checkbox"
            {...register("availability")}
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer"
            }}
          />
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            Available
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s"
          }}
         
        >
          Add Service
        </button>
      </form>
    </div>
  );
};
