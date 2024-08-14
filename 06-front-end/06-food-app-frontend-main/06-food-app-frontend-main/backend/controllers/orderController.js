import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import "dotenv/config";

 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order form backend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    // save the initialized newOrder in database
    await newOrder.save();
    // clear all orders before placing a new order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // let us now create the info to be sent to payment api , to create the invoice

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: 1,
    }));

    // appending a new item to represent delivery charges

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // creating the session for stripe payment

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
    //
  } catch (error) {
    console.log("error", error.message);
    res.json({
      success: false,
      message: `${error.message} is the error in payment`,
    });
  }
};

const verifyOrder=async(req,res)=>{
  const{orderId,success}=req.body;

  try {
        if(success==="true")
        {
          await orderModel.findByIdAndUpdate(orderId,{payment:true});
          res.json({success:true, message:"paid"})
        }
        else{
          await orderModel.findByIdAndDelete(orderId);
          res.json({success:false,message:"not paid"})
        }
  } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
    
  }
}
export { placeOrder,verifyOrder };
