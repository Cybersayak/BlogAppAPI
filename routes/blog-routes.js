import express from "express";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
} from "../controllers/blog-controller.js";
const blogrouter = express.Router();

blogrouter.get("/", getAllBlogs);
blogrouter.post("/create", createBlog);
blogrouter.put("/update/:id", updateBlog);
blogrouter.get("/:id", getBlogById);
blogrouter.delete("/:id", deleteBlog);

export default blogrouter;
