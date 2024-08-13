import jwt from "jsonwebtoken";

const authMiddleware = async (req, res,next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "not an authrized user login again kya",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // decode token
    // after decoding we get an id that was sent on login or register
    // we set the same id to req.body.userId
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log('error=',error);
    res.json({success:true , message:"Error in autherizing in middleware"})
    
  }
};

export default authMiddleware;
