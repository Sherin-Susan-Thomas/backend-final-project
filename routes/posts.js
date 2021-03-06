const router = require("express").Router();
const User = require("../models/User");

const Post = require("../models/Post");

//Create a new post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      response: { savedPost },
      success: true,
    });
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
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.username)) {
      await post.updateOne({ $push: { likes: req.body.username } });
      res.status(200).json("Post has been liked....");
    } else {
      await post.updateOne({ $pull: { likes: req.body.username } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
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
      posts = await Post.find({ username }).sort({ createdAt: "desc" });
    } else if (categoryNames) {
      posts = await Post.find({
        categories: {
          $in: [categoryNames],
        },
      });
    } else {
      posts = await Post.find().sort({ createdAt: "desc" }).limit(20).exec();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
