import { BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";

export default function App(){
  return(
    <BrowserRouter>
    <Navbar/>
    <div className="p-3">
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
  )
}