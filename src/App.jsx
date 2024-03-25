import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SecondNav from "./Components/SecondNav";
import Purchase from "./Pages/Purchase/Purchase";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import { useState } from "react";
import ProductSearchModal from "./Components/ProductSearchModal";

export default function App(){
  // Simulating an error condition
  const errorOccurred = true;
  const [showModal,setShowModal] = useState(false)

  return(
    <BrowserRouter>
      <Navbar setShowModal={setShowModal} />
      <SecondNav />
      <div className="p-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/profile" element={<Profile/>}/>
          {/* Redirect to login if an error occurs */}
          {errorOccurred && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
      { showModal && <ProductSearchModal setShowModal={setShowModal}/>}
      <Footer />
    </BrowserRouter>
  );
}
