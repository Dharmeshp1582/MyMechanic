// import reactLogo from "./assets/react.svg";
// import { UserNavbar } from "./components/layouts/UserNavbar";
// import viteLogo from "/vite.svg";
import "./assets/css/adminlte.css";
import "./assets/css/adminlte.min.css";
import { UserSidebar } from "./components/user/UserSidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import { UserDashboard } from "./components/user/UserDashboard";
import { AdminSidebar } from "./components/admin/AdminSidebar";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AddGarage } from "./components/garageowner/AddGarage";
import { GarageOwnerSidebar } from "./components/garageowner/GarageOwnerSidebar";
import { GarageOwnerDashboard } from "./components/garageowner/GarageOwnerDashboard";
import { useEffect } from "react";
import axios from "axios";
import PrivateRoutes from "./components/hooks/PrivateRoutes";
import LandingPage from "./components/common/LandingPage";
import { ViewMyGarages } from "./components/garageowner/ViewMyGarages";
import { AddGarage2 } from "./components/garageowner/AddGarage2";
import { UpdateMyGarage } from "./components/garageowner/UpdateMyGarage";

import { AboutUs } from "./components/user/AboutUs";
import { Contact } from "./components/user/Contact";
import { ManageUsers } from "./components/admin/ManageUsers";
import PageNotFound from "./components/common/PageNotFound";
import { AddServices } from "./components/garageowner/AddServices";
import { AvailableServices } from "./components/garageowner/AvailableServices";
import { Services } from "./components/user/Services";
import { ProfileDetail } from "./components/shared/ProfileDetail";
import { ResetPassword } from "./components/common/ResetPassword";
import { UpdateServiceData } from "./components/garageowner/UpdateServiceData";
import { Booking } from "./components/user/Booking";
import { ViewServiceDetail } from "./components/shared/ViewServiceDetail";
import { ForgotPassword } from "./components/common/ForgetPassword";
import { AddVehicle } from "./components/user/AddVehicle";
import { ContactUs } from "./components/layouts/ContactUs";
import { About } from "./components/layouts/About";
import { ComServices } from "./components/layouts/ComServices";
import { ViewMyVehicle } from "./components/user/ViewMyVehicle";
import { Appointments } from "./components/garageowner/Appointments";
import ScrollToTop from "./components/common/ScrollToTop";
import { Garages } from "./components/user/Garages";
import { ViewGarageDetail } from "./components/shared/ViewGarageDetail";
import { AppointmentReport } from "./components/admin/AppointmentReport";
import { AllServices } from "./components/admin/AllServices";
import { UpdateService } from "./components/admin/UpdateService";
import { GarageList } from "./components/admin/GarageList";
import { GarageService } from "./components/garageowner/GarageService";
import ProtectedRoute from "./components/hooks/ProtectedRoutes";
import { Unauthorized } from "./components/common/Unauthorized";
import { AddArea } from "./components/admin/AddArea";
import { MyAppointments } from "./components/user/MyAppointments";
import { UserPayments } from "./components/payment/UserPayments";
import { Invoice } from "./components/payment/Invoice";
import { CompleteAppointments } from "./components/admin/CompleteAppointments";
import UsersPayments from "./components/admin/UsersPayments";
import { GarageUserPayments } from "./components/garageowner/GarageUserPayments";
import { AddReview } from "./components/user/AddReview";
import { GetUserReviews } from "./components/garageowner/GetUserReviews";
import { DeleteService } from "./components/garageowner/DeleteService";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



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
    <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/services" element={<ComServices />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
        <Route path="/forgetpassword" element={<ForgotPassword />}></Route>

        <Route path="" element={<PrivateRoutes />}>
          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminSidebar />
              </ProtectedRoute>
            }
          >
            <Route path="manage" element={<ManageUsers />} />
            <Route path="" element={<AdminDashboard />} />
            <Route path="garagelist" element={<GarageList />} />
            <Route path="updateuser/:id" element={<ProfileDetail />} />
            <Route path="service" element={<AllServices />} />
            <Route path="appointment" element={<AppointmentReport />} />
            <Route path="updateservices/:id" element={<UpdateService />} />
            <Route path="completeappointment" element={<CompleteAppointments/>}></Route>
            <Route path="addstate" element={<AddArea/>}></Route>
            <Route path="payment" element={<UsersPayments/>}></Route>
          </Route>

          {/* GARAGE OWNER ROUTES */}
          <Route
            path="/garageowner"
            element={
              <ProtectedRoute allowedRoles={["Garage owner"]}>
                <GarageOwnerSidebar />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<GarageOwnerDashboard />} />
            <Route path="addgarage" element={<AddGarage />} />
            <Route path="addgarage2" element={<AddGarage2 />} />
            <Route path="mygarages" element={<ViewMyGarages />} />
            <Route path="updategarage/:id" element={<UpdateMyGarage />} />
            <Route path="garageservices" element={<GarageService />} />
            <Route path="updateuser/:id" element={<ProfileDetail />} />
            <Route path="servicerequest" element={<Appointments />} />
            <Route path="addservice" element={<AddServices />} />
            <Route path="availableservice" element={<AvailableServices />} />
            <Route path="updateservice/:id" element={<UpdateServiceData />} />
            <Route path="contact" element={<Contact />} />
            <Route path="earning" element={<GarageUserPayments/>}></Route>
            <Route path="garagereviews/:garageId" element={<GetUserReviews/>}></Route>
            <Route path="deleteservice/${serviceId}" element={<DeleteService/>}></Route>
          </Route>

          {/* USER ROUTES */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <UserSidebar />
              </ProtectedRoute>
            }
          >
            <Route path="services" element={<Services />} />
            <Route path="service/:id" element={<ViewServiceDetail />} />
            <Route path="garages" element={<Garages />} />
            <Route path="" element={<UserDashboard />} />
            <Route path="contact" element={<Contact />} />
            <Route path="updateuser/:id" element={<ProfileDetail />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="addvehicle" element={<AddVehicle />} />
            <Route path="booking" element={<Booking />} />
            <Route path="getvehiclebyuserid" element={<ViewMyVehicle />} />
            <Route path="viewgarage/:id" element={<ViewGarageDetail />} />
            <Route path="mypayments" element={<UserPayments/>}></Route>
            <Route path="appointment/paymentdetail/:id" element={<Invoice/>}></Route>
            <Route path="addreview/:garageId" element={<AddReview />} />
           
            <Route path="appointment" element={<MyAppointments/>} />
          </Route>
         
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
