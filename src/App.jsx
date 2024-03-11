import { BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SignUp from "./Pages/Auth/SignUp";
import Purchase from "./Pages/Purchase/Purchase";

export default function App(){
  return(
    <BrowserRouter>
    <Navbar/>
    <div className="p-3">
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Auth/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/purchase" element={<Purchase/>}></Route>
    </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
  )
}