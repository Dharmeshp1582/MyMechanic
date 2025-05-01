import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "../../../src/assets/css/UpdateUser.css";

export const ProfileDetail = () => {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
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
          setSelectedImage(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserDetails();
  }, [userId, setValue]);

  const handleUpdate = async (data) => {
    try {
      const updatedData = new FormData();
      updatedData.append("fullName", data.fullName);
      updatedData.append("contact", data.contact);
      if (selectedImage) {
        updatedData.append("image", selectedImage);
      }

      const response = await axios.put(`/updateuser/${userId}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 200) {
        toast.success("Profile Updated Successfully!", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",

          transition: Bounce,
          onClose: () => navigate(-1)
        });
        setUser((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const defaultAvatar =
    user?.imageURL ||
    `https://ui-avatars.com/api/?name=${
      user?.fullName?.charAt(0) || "U"
    }&background=random&color=fff&size=100`;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        transition={Bounce}
      />
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-header">Update Profile</h2>
          <img
            src={
              selectedImage ? URL.createObjectURL(selectedImage) : defaultAvatar
            }
            alt="Profile"
            className="profile-img"
          />
          <form className="profile-form" onSubmit={handleSubmit(handleUpdate)}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                {...register("fullName", { required: "Name is required" })}
              />
              {errors.fullName && (
                <span className="error-text">{errors.fullName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" {...register("email")} disabled />
            </div>

            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                {...register("contact", { required: "Contact is required" })}
              />
              {errors.contact && (
                <span className="error-text">{errors.contact.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </div>

            <button type="submit" className="update-btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
