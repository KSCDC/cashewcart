import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SecondNav from "./Components/SecondNav";
import Purchase from "./Pages/Purchase/Purchase";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import UserPage from "./Pages/UserPage/UserPage";
import Cart from "./Pages/Cart/Cart";

export default function App(){
  // Simulating an error condition
  const errorOccurred = true;

  return(
    <BrowserRouter>
      <Navbar />
      <SecondNav />
      <div className="p-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />
          {/* Redirect to login if an error occurs */}
          {errorOccurred && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
