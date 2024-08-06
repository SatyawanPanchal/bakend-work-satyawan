import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// some notes
// (JSON Web Token) is a way of securely transmitting information between two parties
// bcrypt :password security : making it more resistant to brute-force attacks
//  validator : checks like isEmail , isEmpty etc

// Login User

const loginUser = async (req, res) => {
  const {email,password}=req.body;
  try {
    const user=await userModel.findOne({email})
    if (!user) {
      res.json({success:false,message:'user doesnt exist or email not correct'})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.json({success:false,message:'invalid credentials'})
    }
    const token=createToken(user._id);
   res.json({success:true,token})

  } catch (error) {
    console.log('error found n login',error);
    res.json({success:false,message:"error"})

    
    
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }
    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    // if length of password is less than 8 than we will get a message like given one
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter an strong passwod",
      });
    }
    // encrypting the password
    const salt = await bcrypt.genSalt(10); //range is 5 to 15 ... number is high means password is highly secure
    const hashedPassword = await bcrypt.hash(password, salt); //encrypting it using hashing technique
    //now creating the new user

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) 
  {
    res.json({success:false,message:"error here in userController registration"})
  }
};

export { loginUser, registerUser };
