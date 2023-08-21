import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password, day, month, year, sex } =
    req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const username = firstName + lastName;
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashed,
      sex,
      birthDay: {
        day,
        month,
        year,
      },
      username,
    });

    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    res
      .cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        secure: true,
      })
      .status(201)
      .json({ message: "successfull", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Account creation failed. " + error });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Account not found." });
    const isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch)
      return res.status(400).json({
        success: false,
        message: "The email and password does not match.",
      });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    res
      .cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        secure: true,
      })
      .status(201)
      .json({ message: "successfull", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Sign in failed. " + error });
  }
};
