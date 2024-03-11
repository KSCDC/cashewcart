import { BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";

export default function App(){
  return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}