import { User } from "../models/user.modle.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authentication")?.replace("Bearer ", "");
  
    if(!token){
      throw new ApiError("Unothorized access", 401);
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id)
    .select("-password -refreshToken");
  
    if(!user){
      //TODO: discuss about frontend.
      throw new ApiError("Invalid access token", 401);
    }
  
    req.user = user;
    
    next();

  } catch (error) {
    throw new ApiError(error?.message || "Invadil access token", 401);
  }

});

export { verifyJWT }