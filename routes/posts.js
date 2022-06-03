const router = require("express").Router();
const User = require("../models/User");

const Post = require("../models/Post");

//Create a new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

//Update a new post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a new post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted....");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like a post
router.post("/:id/likePost", async (req, res) => {
  const { id } = req.params;

  try {
    const postToLike = await Post.findByIdAndUpdate(id, {
      $inc: { hearts: 1 },
    });
    res.status(201).json(postToLike);
  } catch (err) {
    res.status(400).json({
      success: false,
      status_code: 400,
      message: "Bad request, couldnot like the post!",
      error: err.errors,
    });
  }
});
//comment on a post
router.post("/:id/commentPost", async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Post.findById(id);
  post.comments.push(value);
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.status(200).json(updatedPost);
});

//Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});
//get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const categoryNames = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (categoryNames) {
      posts = await Post.find({
        categories: {
          $in: [categoryNames],
        },
      });
    } else {
      posts = await Post.find().sort({ createdAt: "desc" }).limit(6).exec();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
