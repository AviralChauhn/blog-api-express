import express from "express";
import {
  addBlogs,
  deleteByID,
  getAllBlogs,
  getByID,
  getByUserId,
  updateBlog,
} from "../controllers/blog-controller.js";
const blogRouter = express.Router();
blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlogs);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getByID);
blogRouter.delete("/:id", deleteByID);
blogRouter.get("/user/:id", getByUserId);
export default blogRouter;
