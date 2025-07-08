import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( (req, res) => {
  res.status(200).json({
    messgae: "-> Everything is working fine."
  });
});

console.log(typeof registerUser)

export { registerUser };