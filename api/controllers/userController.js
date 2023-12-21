import User from "../model/User.js";
import express from "express";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import res from "express/lib/response.js";
import Listing from "../model/Listing.js";

// Update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//Delete User
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "successfully deleted the user" });
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } else {
      return next(errorHandler(401, "You can only view your own listing!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async(req,res,next) =>{
  try {
    const user = await User.findById(req.params.id);
  
    if(!user) return next(errorHandler(401, "User not found!"));
  
    const {password:pass, ...rest} = user._doc;
    res.status(200).json(rest);
    
  } catch (error) {
    next(error);
  }
}
