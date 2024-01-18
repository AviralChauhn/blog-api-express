import mongoose from "mongoose";
import blog from "../model/blog.js";
import User from "../model/user.js";
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await blog.find();
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found :(" });
  }
  return res.status(200).json({ blogs });
};
export const addBlogs = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this id" });
  }
  const blogs = new blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blogs.save({ session });
    existingUser.blogs.push(blogs);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blogs });
};
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blogs;
  try {
    blogs = await blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    res.status(500).json({ message: "Unable to update the Blog" });
  }
  return res.status(200).json({ blogs });
};
export const getByID = async (req, res, next) => {
  const id = req.params.id;
  let blogs;
  try {
    blogs = await blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(400).json({ message: "No Blog Found!!!" });
  }
  return res.status(200).json({ blogs });
};
export const deleteByID = async (req, res, next) => {
  const id = req.params.id;
  let blogs;
  try {
    blogs = await blog.findByIdAndDelete(id).populate("user");
    await blogs.user.blogs.pull(blogs);
    await blogs.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    return res.status(500).json({ messag: "Unable To Delete!!!" });
  }
  return res.status(200).json({ message: "Delete SuccessFull!!! " });
};
export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blogs FOund!!!" });
  }
  return res.status(200).json({ userBlogs });
};
