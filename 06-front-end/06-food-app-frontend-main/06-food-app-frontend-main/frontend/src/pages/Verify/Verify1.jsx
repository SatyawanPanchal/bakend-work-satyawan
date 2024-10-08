import { useNavigate, useSearchParams } from "react-router-dom"
import "./verify.css"
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify1 = () => {
    const[searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    console.log('====================================');
    console.log(success,orderId);
    console.log('====================================');
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();

const verifyPayment=async()=>{
    const response=await axios.post(url+"/api/order/verify",{success,orderId});
    console.log('====================================');
    console.log(response);
    console.log('====================================');
    if(response.data.success)
    {
        navigate("/myorders")

    }else{
        navigate("/")
    }
}

useEffect(()=>{
    verifyPayment()
},[])
  return (
    <div className="verify">
    <div className="spinner">

    </div>
      
    </div>
  )
}

export default Verify1
