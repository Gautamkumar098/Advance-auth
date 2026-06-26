import crypto from "crypto";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/emails.js";

//signup routes logic
export const signup = async (req, res) => {
  try {
    //fetch data from client
    const { email, password, name, profilePhoto } = req.body;

    //validation
    if (!email || !password || !name) {
      //nhi mila to res bhejenge client ko
      return res.status(400).json({
        success: false,
        message: "please provide all details",
      });
    }

    //isUser already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Already registered with us, please login to continue",
      });
    }

    //password hashed form
    const hashedPassword = await bcrypt.hash(password, 10);

    //generate verification token
    const verification_token = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    //user save in db
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      profilePhoto: profilePhoto || null,
      verification_token,
      verification_token_expiry: Date.now() + 24 * 60 * 60 * 1000, //24hrs
    });

    await sendVerificationEmail(newUser.email, verification_token);

    //generate jwt token and set cookies
    generateTokenAndSetCookie(res, newUser._id);

    //return res to client
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error is:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

//verify_email
export const verifyEmail = async (req, res) => {
  //123456
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verification_token: code,
      verification_token_expiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verification_token = undefined;
    user.verification_token_expiry = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error is:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//login routes logic
export const login = async (req, res) => {
  try {
    //fetch data from client
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "please provide all details",
      });
    }

    //validation isUser exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "please register  first",
      });
    }

    //validation isPassword is correct or not
    //password => hashed format
    //password => plain text =>isko convert hashed format then comapared both password
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "password is incoorect",
      });
    }

    //generate access tokens
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in  successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error is:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
  //9. Recommended Login Flow
  //✅ Validate input
  //✅ Find user
  //✅ Compare password
  ///✅ Generate access token
  //✅ Generate refresh token
  //✅ Hash refresh token
  //✅ Save hashed refresh token in DB
  //✅ Send plain refresh token in cookie
  //✅ Send access token in response
  //This is the standard secure flow.
};

//forgot_Password
export const forgot_password = async (req, res) => {
  try {
    //fetch data from client
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }

    //generate reset token
    const reset_token = crypto.randomBytes(20).toString("hex");
    const reset_token_expiry = Date.now() + 1 * 60 * 60 * 1000; //1hr

    user.reset_password_token = reset_token;
    user.reset_password_token_expiry = reset_token_expiry;

    await user.save();

    //send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${reset_token}`,
    );

    //return res to client
    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("error is:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

// //reset_password
export const reset_password = async (req, res) => {
  try {
    //fetch data from client
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      reset_password_token: token,
      reset_password_token_expiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token ",
      });
    }

    //update password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.reset_password_token = undefined;
    user.reset_password_token_expiry = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    //return res to client
    return res.status(200).json({
      success: true,
      message: "password reset  successfully, now login and enjoy ",
    });
  } catch (error) {
    console.log("error is:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

//check auth
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found ",
      });
    }

    //return res to client
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("error is:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, profilePhoto } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields
    if (name) user.name = name;
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error is:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
