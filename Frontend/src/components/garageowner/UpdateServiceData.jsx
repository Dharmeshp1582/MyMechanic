import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const UpdateServiceData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  // Fetch existing service data
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await axios.get(`/service/getservicebyid/${id}`);
        const serviceData = res.data.data;

        if (serviceData) {
          Object.keys(serviceData).forEach((key) => {
            setValue(key, serviceData[key]);
          });
          setImagePreview(serviceData.image);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load service data.");
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id, setValue]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const submitHandler = async (data) => {
    try {
      const userId = localStorage.getItem("id");
      data.userId = userId;
      delete data._id;

      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await axios.put(`/service/updateservice/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.status === 200) {
        toast.success("Service updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
          onClose: () => navigate("/garageowner/availableservice")
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Service not updated! Please try again.",
        {
          position: "top-center",
          // autoClose: 2000,
          theme: "dark",
          transition: Bounce
        }
      );
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(250, 251, 254)" }}>
    
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
        <div>
          <button
            onClick={() => navigate(-1)}
            className="book-app-go-back-button"
          >
            ← Go Back
          </button>
        </div>
        <h1
          style={{
            margin: "0px 0px 20px 0px",
            padding: "12px 99px",
            backgroundColor: "rgb(194 194 194)",
            borderRadius: "60px"
          }}
        >
          Update Service
        </h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form
            onSubmit={handleSubmit(submitHandler)}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              maxWidth: "600px",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgb(169, 164, 164)",
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
              {...register("description", {
                required: "Description is required"
              })}
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

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px"
              }}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Service Preview"
                style={{
                  width: "100px",
                  borderRadius: "5px",
                  marginTop: "10px"
                }}
              />
            )}

            {/* Checkbox */}
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
                checked={watch("availability")}
                onChange={(e) => setValue("availability", e.target.checked)}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Available
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: "30%",
                padding: "12px",
                backgroundColor: "rgb(30, 32, 35)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s",
                margin: "0px auto"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(112, 117, 133)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(30, 32, 35)")}
            >
              Update Service
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
