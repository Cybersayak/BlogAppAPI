import express from "express";
import { getAllBlogs, createBlog } from "../controllers/blog-controller.js";
const blogrouter = express.Router();

blogrouter.get("/", getAllBlogs);
blogrouter.post("/create", createBlog);
export default blogrouter;
