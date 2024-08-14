import   { useContext,   useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const{getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
const [data,setData]=useState({
  firstname:"",
  lastname:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""
})
  
const onChangeHandler=(event)=>{
  const name=event.target.name;
  const value=event.target.value;
  setData(data=>({...data,[name]:value}))
}

const placeOrder=(event)=>{
event.preventDefault();
let orderItems=[];
food_list.map((item)=>{
  if(cartItems[item._id]>0)
  {
    let itemInfo=item;
    itemInfo["quantity"]=cartItems[item._id];
    orderItems.push(itemInfo);
  }
})
console.log('====================================');
console.log("order items",orderItems);
console.log('====================================');

}
 
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstname" onChange={onChangeHandler} value={data.firstname}  placeholder="First Name" />
          <input type="text" name="lastname" onChange={onChangeHandler} value={data.lastname} placeholder="Last Name" />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="email address" />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>₹ {getTotalCartAmount() * 86}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {200}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{86 * getTotalCartAmount() + 200}</b>
            </div>
            <hr />
          </div>
          <button type="submit" >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
