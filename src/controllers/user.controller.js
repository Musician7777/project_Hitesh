import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.modle.js";
import { fileUpload } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //Complete checks and registration.
  //->get the user details.
  //->check if everything is not empty.
  //->validation.
  //->get the avatar image and validate.
  //->save the image and coverImage to the cloudinary and get the link.
  //->store user to the DB.
  //->remove password and refrest token fiels from the response.
  //->check if the user created successfully.
  //->send the response to the user.

  const { email, password, fullName, username } = req.body;

  if (
    [email, password, fullName, username].some((elem) => elem?.trim() === "")
  ) {
    throw new ApiError("All the text fields are required", 400);
  }

  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (userExists) {
    console.log("userExistsTest -> ", userExists);
    throw new ApiError("User already exists", 409);
  }

  const avatarPath = req.files?.avatar[0]?.path;
  const coverImagePath = req.files?.coverImage?.[0]?.path;

  if (!avatarPath) {
    throw new ApiError("Avatar is required", 400);
  }

  //Upload avatar and coverimage? on cloudinary.
  const avatar = await fileUpload(avatarPath);
  const coverImage = await fileUpload(coverImagePath);

  if (!avatar) {
    throw new ApiError("Avatar is required", 400);
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError("Something went wrong while registering user", 500);
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const accessAndRefreshTokens = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validationBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError("Error while generating the tokens", 500);
  }
};

const loginUser = asyncHandler(async (req, res) => {
  //get the details from req.
  //check on the basis of email and username with password.
  //get details from the DB.
  //check if the credientials are correct.

  const { email, username, password } = req.body;

  if (!email || (!username && !password)) {
    throw new ApiError("Username or email and password is required", 400);
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError("Wrong password", 400);
  }

  const { accessToken, refreshToken } = await accessAndRefreshTokens(user);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: user,
          accessToken,
          refreshToken,
        },
        "Login successfull"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secured: true
  }

  res.status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(
    new ApiResponse(200, {}, "User logged out !")
  )

});

export { registerUser, loginUser, logoutUser };
