/* eslint-disable react/prop-types */
import { createContext,   useEffect,   useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const[token,setToken]=useState([])
  const [cartItems, setCartItems] = useState({})
  const url="http://localhost:4000"
  
  const addToCart = (itemId) => {
    if (!cartItems[itemId])
    {
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else {
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }

  }

  const removeFromCart = (itemId) => {
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }
 
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems)
    {
      if (cartItems[item] > 0)
      {
        let currentItem = food_list.find((product) => product._id === item);
        totalAmount += currentItem.price * cartItems[item];
      }
    }
    return totalAmount;
  }
  
   

  const contextValue = {
    food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,url,token,setToken
   
  };

useEffect(()=>{
  if(localStorage.getItem("token"))
  {
    setToken(localStorage.getItem("token"))
  }
},[])


  return (
    <StoreContext.Provider value={contextValue}>
      
       {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
