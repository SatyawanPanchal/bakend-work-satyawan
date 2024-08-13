import userModel from "../models/userModel.js";

//add items to user cart
const addToCart = async (req, res) => {
  try {
    // we are trying to find the same data
    //where _id is same as id got in from token i.e. req.body.userId

    let userData = await userModel.findOne({ _id: req.body.userId });
    // lets get the cartData here
    let cartData = await userData.cartData;
    // if there is no entery in cartData with name itemId then
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1; // then we created a new entery and set that to 1
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData }); // we have added this data with the user
    res.json(error);
    {
      console.log("error", error.message);
      res.json({
        success: false,
        message: error.message + "is the error in updating the cart data ",
      });
    }
  } catch (error) {}
};

// remove items form user cart

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId); // it is same as above
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "item removed from cart" });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: "some error occured in removing" });
  }
};

// fetch the user cart data

const getCart = async (req, res) => {

  try {
   let userData=await userModel.findById(req.body.userId);
   let cartData=userData.cartData;
   res.json({success:true , cartData})
  
 
  
 

  } catch (error) {
    console.log('error',error);
    res.json({success:false,message:error.message+"some error in getting the cart data"})
    
  }


};

export { addToCart, removeFromCart, getCart };
