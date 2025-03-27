import axios from 'axios';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const UpdateServiceData = () => {
    const id = useParams().id;
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const {register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => {
            const res = await axios.get("/service/getservicebyid/"+id)
            return res.data.data
          }
    }
    );


    const submitHandler = async (data) => {
        try {
          const userId = localStorage.getItem("id")
            data.userId = userId

            delete data._id; //put _id -->
            console.log(data)
            const res = await axios.put("/service/updateservice/"+id, data)
            console.log(res.data)
    
          console.log(res)
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
            error.response
              ? "Service not updated!"
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
    <>
    <ToastContainer/>
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
      <h1 style={{
        margin: "0px 0px 20px 0px",
        padding: "12px 99px",
        backgroundColor: "rgb(194 194 194)",
        borderRadius: "60px"
      }}>Update Service</h1>
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
          backgroundColor: "rgb(232 232 232)",
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
        {errors.allInclusivePrice && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.allInclusivePrice.message}
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
            width: "30%",
            padding: "12px",
            backgroundColor: "#9f8b8b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s",
            margin:"0px auto"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#785c5c")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#9f8b8b")}
        >
          Update Service
        </button>
      </form>

    </div>
    </>
  )
}