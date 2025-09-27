
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedRoute = async (req,res,next) => {

  try {
    const token = req.cookies.token;
    if(!token)
    {
      return res.status(401).json({message: 'Token not found'});
    }

    const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!payload) 
    {
      return res.status(401).json({message: 'Invalid token'});
    }

    const user = await User.findById(payload.userId).select("-password");
    if(!user)
    {
      return res.status(404).json({message: 'User not found'});
    }

    req.user = user;
    // console.log("this is from protected: ",res.user)
    next();


  } catch (error) {
    console.log("Error in auth middleware: " , error.message);
    return res.status(500).json({message: 'Server error'});
  }
}