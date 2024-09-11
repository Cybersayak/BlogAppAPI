import Blog from "../model/Blog.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogs });
};

export const createBlog = async (req, res, next) => {
  const { title, description, user, image } = req.body;

  let existingBlog;
  try {
    existingBlog = await Blog.findOne({ title });
  } catch {
    return console.log(err);
  }
  if (existingBlog) {
    return res.status(400).json({ message: "Blog already exists" });
  }

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found by This ID" });
  }

  const blog = new Blog({
    title,
    description,
    user,
    image,
  });
  try {
    // await blog.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description, user } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the Blog " });
  }
  return res.status(200).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Unable to find the Blog " });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Unable to find the Blog " });
  }
  return res.status(200).json({ message: "Blog deleted successfully" });
};

export const getByUserId = async (req, res, next) => {
  const userIdd = req.params.id;
  let userBlogs;
  try {
    userBlogs = await Blog.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "Unable to find the Blog" });
  }
  return res.status(200).json({ blogs: userBlogs });
};
