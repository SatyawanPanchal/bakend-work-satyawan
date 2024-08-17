import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  console.log('token in auth.js',req.headers);
  
  if (!token) {
    return res.json({
      success: false,
      message: "not an authrized user login again kya",
    });
  }
  console.log("====================================");
  console.log("jwt key", process.env.JWT_SECRET);
  console.log("====================================");
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // decode token
    // after decoding we get an id that was sent on login or register
    // we set the same id to req.body.userId
    req.body.userId = token_decode.id;
    console.log("we got the the id after token decode", req.body.userId);

    next();
  } catch (error) {
    console.log("error=", error);
    res.json({
      success: false,
      message: error.message + "Error in autherizing in middleware",
    });
  }
};

export default authMiddleware;
