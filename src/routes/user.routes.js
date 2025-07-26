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
router.route("/refresh-login").post(refreshTheAccessToken);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update-password").post(verifyJWT, updatePassword);
router.route("/update-user-details").post(verifyJWT, updateAccountDetails);

router.route("/current-user").get(getCurrentUser);
router.route("/watch-history").get(userWatchHistory);
router.route("/channel-profile/:username").get(getUserChannelProfile);



export default router;