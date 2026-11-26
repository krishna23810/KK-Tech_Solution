import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUS from "./pages/Contact";
import CartPage from "./pages/catalog/CartPage";
import Course from "./pages/CoursePage/Course";
import Error from "./pages/error";

// Auth Pages
import Signup from "./pages/Singup";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import PrivateRoute from "./components/core/Auth/PrivateRoute";

// Dashboard Pages
import MyProfile from "./components/core/Dashboard/MyProfile";
import Setting from "./components/core/Dashboard/setting/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index";
import MyCourses from "./components/core/Dashboard/MyCourses/index";
import CreateCourse from "./components/core/Dashboard/CreateCourse/index";
import EditCourse from "./components/core/Dashboard/editcourse/index";
import DeshbordPage from "./components/core/Dashboard/Deshbord/index";

// Course Player Pages
import ViewCourse from "./pages/ViewCourse";
import VideoDetail from "./components/core/ViewCourse/VideoDetail";

import { ACCOUNT_TYPE } from "./data/contants";

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-slate-50 flex flex-col font-poppins text-slate-900">
      <Routes>
        {/* Public & Marketing Routes (Navbar + Main + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/catalog/:catalogName" element={<CartPage />} />
          <Route path="/course/:Course_Id" element={<Course />} />
        </Route>

        {/* Authentication Routes (Minimal centered layout) */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/reset-password/:id" element={<ResetPass />} />
        </Route>

        {/* Protected Dashboard Routes (Navbar + Sidebar + Independent Scroll Area) */}
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Setting />} />

          {/* Student-only Dashboard Routes */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}

          {/* Instructor-only Dashboard Routes */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/my-courses" element={<MyCourses />} />
              <Route path="/dashboard/add-course" element={<CreateCourse />} />
              <Route path="/dashboard/my-courses/editCourse/:courseId" element={<EditCourse />} />
              <Route path="/dashboard/instructor" element={<DeshbordPage />} />
            </>
          )}
        </Route>

        {/* Course Video Player */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetail />}
            />
          )}
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
