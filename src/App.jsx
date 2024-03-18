import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SecondNav from "./Components/SecondNav";

export default function App(){
  return(
    <BrowserRouter>
    <Navbar/>
    <SecondNav/>
    <div className="p-3">
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
  )
}