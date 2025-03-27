import { useEffect, useState } from "react";
import "../../../src/assets/css/UpdateUser.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { GetAppointmentDetail } from "../user/GetUserAppointmentdetail";

export const ProfileDetail = () => {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userId] = useState(localStorage.getItem("id"));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Function to fetch user details
  const fetchUserDetails = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`/users/${userId}`);
      if (response.data?.data) {
        const userData = response.data.data;
        setUser(userData);
        setValue("fullName", userData.fullName || "");
        setValue("contact", userData.contact || "");
        setValue("email", userData.email || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const handleUpdate = async (data) => {
    try {
      const updatedData = new FormData();
      updatedData.append("fullName", data.fullName);
      updatedData.append("contact", data.contact);
      if (data.image?.[0]) {
        updatedData.append("image", data.image[0]);
      }

      const response = await axios.put(`/updateuser/${userId}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Profile Updated Successfully!");
        
        // ✅ Re-fetch user details after update
        fetchUserDetails();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" transition={Bounce} />
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-header">Update Profile</h2>
          <form className="profile-form" onSubmit={handleSubmit(handleUpdate)}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" {...register("fullName", { required: "Name is required" })} />
              {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" {...register("email")} disabled />
            </div>

            <div className="form-group">
              <label>Contact</label>
              <input type="text" {...register("contact", { required: "Contact is required" })} />
              {errors.contact && <span className="error-text">{errors.contact.message}</span>}
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <input type="file" {...register("image")} onChange={(e) => setSelectedImage(e.target.files[0])} accept="image/*" />
            </div>

            <button type="submit" className="update-btn">
              Update
            </button>
          </form>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <GetAppointmentDetail />
      </div>
    </>
  );
};
