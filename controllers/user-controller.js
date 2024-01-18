import user from "../model/user.js";
import bcrypt from "bcryptjs";
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await user.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "user Already Exists! try login" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const users = new user({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  try {
    await users.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ users });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "couldn't find user with this email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(404).json({ message: "password incorrect!!!!" });
  }
  return res.status(200).json({ message: "Login Successfull!!!!!!" });
};
