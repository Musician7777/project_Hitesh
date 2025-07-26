import { Router } from "express";
import { 
  logoutUser,
  registerUser,
  loginUser,
  refreshTheAccessToken,
  updatePassword,
  getCurrentUser,
  updateAccountDetails,
  getUserChannelProfile,
  userWatchHistory

} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
); //Register
router.route("/login").post(loginUser);

//Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-login").post(refreshTheAccessToken);
router.route("/update-password").post(updatePassword);
router.route("/update-user-details").post(updateAccountDetails);
router.route("/current-user").get(getCurrentUser);
router.route("/channel-profile").get(getUserChannelProfile);
router.route("/watch-history").get(userWatchHistory);



export default router;