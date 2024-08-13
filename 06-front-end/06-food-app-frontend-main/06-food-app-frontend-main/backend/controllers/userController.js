import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// while logging in
// 1.we need to check wheater one with this email already exists
// 2.then we will check for  password actually mathches
// 3.if yes create the token and send it back with success

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }); // we try to get one with same email id
    if (!user) {
      // if user is not found
      return res.json({
        success: false,
        message: "no such user or email is incorrect",
      });
    }
    // if user is found we check for password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      // well check if password is not matched
      return res.json({
        success: false,
        message: "Here password is not matched",
      });
    }

    // both email and password taken from database are matched so we need to create a token and send it back to
    //client end

    const token = createToken(user._id);
    return res.json({ success: true, message: "we have got the user", token });
  } catch (error) {
    return res.json({ success: false,  message:`${error.message}` });
  }
  
};

// // register user

// while doing registration we do following things
// 1. user already exists or not if yes give message if not register a new user
// 2. is email valid
// 3. is password valid if no give message
// 4. if yes encrypt it and make a model to store this to database
// 5. also create a token and send back to frontend

const registerUser = async (req, res) => {
  const {name, email, password} = req.body;

  const exists = await userModel.findOne({email})

  console.log('====================================');
  console.log("this is existing",exists);
  console.log('====================================');

  try {
    if (exists) {
      return res.json({ success: false, message:`${exists} user already exists karta hai` });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter the length more than 8 characters",
      });
    }

    // well if email and password both are perfect we need to encrypt the password by using bcrypt

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // well if password is encrypted create a new userModel instance and store the data in database

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // now let us save the user with encrypted password

    const user = await newUser.save();

    const Token = createToken(user._id); // token created
    res.json({ success: true, Token });
  } catch (error) {
    return res.json({ success: false, message: `${error.message}`+"Some Error occured" });
  }
};

export { loginUser, registerUser };
