import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
   setData(response.data.data);
   setLoading(false);
   console.log('data we have recieved=data',response);
   
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
      console.log('orders we got ',data);
      
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
      
      {data.map((order,index)=>{
        return(
            <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            {/* <p>{order.items.map((item,index)=>{
              if(index===order.items.length-1)
              {
                return item.name +"x"+item.qu
              }
            })}</p> */}

            </div>
        )
      })}
          
      </div>
    </div>
  );
};

export default MyOrders;
