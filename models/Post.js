const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fdefault-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg&imgrefurl=https%3A%2F%2Fwww.dreamstime.com%2Fdefault-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-image227787227&tbnid=OlLg7UY_Xr_DPM&vet=12ahUKEwj-7_igq7X4AhVNmosKHdWzAcwQMygAegUIARDnAQ..i&docid=1ygIPE6PPcKtWM&w=800&h=800&q=icon%20profile%20picture&ved=2ahUKEwj-7_igq7X4AhVNmosKHdWzAcwQMygAegUIARDnAQ",
    },
    username: {
      type: String,
    },
    categories: {
      type: Array,
      required: false,
    },

    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
