import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({
      message: "No users found",
    });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });// identify if user exists by email
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({
      message: "User Already Exist",
    });
  }
  const hashedPassword = bcrypt.hashSync(password);//BCrypt used for hashing 
  const user = new User({
    name,
    email,
    password:hashedPassword,
  });
  try {
    user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({
    message: "User created successfully",
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({message: "User not found"});
  }
  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordValid){
    return res
      .status(400)
      .json({ message: "Incorrect Password" })
  }
  return res.status(200).json({
    message: "Logged in successfully"
  })
}