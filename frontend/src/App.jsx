// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllStalls from "./pages/AllStalls";
import StallDetails from "./pages/StallDetails";
import CreateStall from "./pages/CreateStall";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import MyBids from "./pages/MyBids";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Footer from './components/common/Footer'
import UpdateStall from "./pages/UpdateStall";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stalls" element={<AllStalls />} />
        <Route path="/stall/:id" element={<StallDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute allowedRole="principal" />}>
          <Route path="/dashboard" element={<PrincipalDashboard />} />
          <Route path="/create-stall" element={<CreateStall />} />
          <Route path="/stall/edit/:id" element={<UpdateStall />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="student" />}>
          <Route path="/my-bids" element={<MyBids />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
