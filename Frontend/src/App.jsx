// import reactLogo from "./assets/react.svg";
// import { UserNavbar } from "./components/layouts/UserNavbar";
// import viteLogo from "/vite.svg";
import "./assets/css/adminlte.css";
import "./assets/css/adminlte.min.css"; 
import { UserSidebar } from "./components/sidebar/UserSidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import { UserDashboard } from "./components/dashboard/UserDashboard";
import { AdminSidebar } from "./components/sidebar/AdminSidebar";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { AddGarage } from "./components/garageowner/AddGarage";
import { GarageOwnerSidebar } from "./components/sidebar/GarageOwnerSidebar";
import { GarageOwnerDashboard } from "./components/dashboard/GarageOwnerDashboard";
import { useEffect } from "react";
import axios from "axios";
import PrivateRoutes from "./components/hooks/PrivateRoutes";
import LandingPage from "./components/common/LandingPage";
import { ViewMyGarages } from "./components/garageowner/ViewMyGarages";
import { AddGarage2 } from "./components/garageowner/AddGarage2";
import { UpdateMyGarage } from "./components/garageowner/UpdateMyGarage";
import { GarageList } from "./components/admin/GarageList";
import { AboutUs } from "./components/user/AboutUs";
import { Contact } from "./components/user/Contact";
import { ManageUsers } from "./components/admin/ManageUsers";
import PageNotFound from "./components/common/PageNotFound";
import { AddServices } from "./components/garageowner/AddServices";
import { AvailableServices } from "./components/garageowner/AvailableServices";
import { Services } from "./components/user/Services";
import { ProfileDetail } from "./components/shared/ProfileDetail";
import {ResetPassword} from "./components/common/ResetPassword";
import { UpdateServiceData } from "./components/garageowner/UpdateServiceData";
import { Booking } from "./components/user/Booking";
import { ViewServiceDetail } from "./components/shared/ViewServiceDetail";
import { ForgotPassword } from "./components/common/ForgetPassword";


function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);
  return (
    <div
      className={
        location.pathname === "/login" || location.pathname === "/signup"
          ? ""
          : "app-wrapper"
      }
    >
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword/>}></Route>
        <Route path="/forgetpassword" element={<ForgotPassword/>}></Route>

        <Route path="" element={<PrivateRoutes />}>
          <Route path="/admin" element={<AdminSidebar />}>
            <Route path="manage" element={<ManageUsers/>}></Route>
            <Route path="" element={<AdminDashboard />}></Route>
            <Route path="garagelist" element={<GarageList />}></Route>
            <Route path="updateuser/:id" element={<ProfileDetail/>}></Route>
          </Route>
          <Route path="/garageowner" element={<GarageOwnerSidebar />}>
            <Route path="" element={<GarageOwnerDashboard />}></Route>
            <Route path="addgarage" element={<AddGarage />}></Route>
            <Route path="addgarage2" element={<AddGarage2 />}></Route>
            <Route path="mygarages" element={<ViewMyGarages />}></Route>
            <Route path="updategarage/:id" element={<UpdateMyGarage />}></Route>
            <Route path="updateuser/:id" element={<ProfileDetail/>}></Route>
            <Route path="addservice" element={<AddServices/>}></Route>
            <Route path="availableservice" element={<AvailableServices/>}>
            </Route>
            <Route path="updateservice/:id" element={<UpdateServiceData/>}></Route>
          </Route>
          <Route path="/user" element={<UserSidebar />}>
            <Route path="services" element={<Services />}></Route>
            <Route path="viewdetail" element={<ViewServiceDetail/>}></Route>
            <Route path="" element={<UserDashboard />}></Route>
            <Route path="contact" element={<Contact />}></Route>
            <Route path="updateuser/:id" element={<ProfileDetail/>}></Route>
            <Route path="aboutus" element={<AboutUs />}></Route>
            <Route path="booking" element={<Booking/>}></Route>
          </Route>
          
          
        </Route>
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
