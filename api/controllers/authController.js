import User from "../model/User.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import res from "express/lib/response.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });
  try {
    const savedUser = await newUser.save();
    res
      .status(201)
      .send({ message: "User has been created successfully", savedUser });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const Password = bcrypt.compareSync(password, validUser.password);
    if (!Password) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    let currentUser;
    if (user) {
      const { password: pass, ...rest } = user._doc;
      currentUser = rest;
      const token = jwt.sign({ id: currentUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split("").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      currentUser = rest;
    }
    const token = jwt.sign({ id: currentUser._id }, process.env.JWT);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(currentUser);
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
