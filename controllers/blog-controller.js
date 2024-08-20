import Blog from "../model/Blog.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try{
    blogs = await Blog.find();
  }catch {
    return console.log(err);
  }
  if(!blogs){
    return res
      .status(404)
      .json({message:"No blogs found"});
  }
  return res.status(200).json({blogs})
};
export const createBlog = async (req, res, next) => {
  const { title, description, user } = req.body;
  let existingBlog;
  try{
    existingBlog = await Blog.findOne({title});
  }catch {
    return console.log(err);
  }
  if(existingBlog){
    return res
      .status(400)
      .json({message:"Blog already exists"});
  }
  const blog = new Blog({
    title,
    description,
    user,
  });
  try{
   await blog.save();
  }catch {
    return console.log(err);
  }
  return res.status(201).json({message:"Blog created successfully"});
}