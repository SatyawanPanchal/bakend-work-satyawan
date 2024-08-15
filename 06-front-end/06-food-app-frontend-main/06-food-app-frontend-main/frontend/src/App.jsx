import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopUp1 from "./components/LoginPopup1/LoginPopUp1";
import Verify1 from "./pages/Verify/Verify1";
import MyOrders from "./pages/MyOrders/MyOrders";
 

const App = () => {
  const[showLogin,setShowLogin]=useState(false)
  return (<>
    {showLogin ? <LoginPopUp1 setShowLogin={ setShowLogin} />:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<PlaceOrder />}> </Route>
      <Route path="/verify" element={<Verify1/>}> </Route>
      <Route path="/myorders" element={<MyOrders/>}></Route>
      </Routes>
   
    </div>
    <Footer/>
  </>
     
  );
};

export default App;
