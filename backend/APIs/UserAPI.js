import exp from "express";
import { register, authenticate } from "../services/authService.js";
import { ArticleModel } from "../models/articleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const userRoute = exp.Router();

//Register user
userRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;
  console.log("[USER_REG] Incoming request body:", req.body);
  console.log("[USER_REG] File received:", req.file ? "yes" : "no");
  console.log("[USER_REG] Headers:", req.headers);

  try {
    //getb user obj
    let userObj = req.body;
    console.log("[USER_REG] User object keys:", Object.keys(userObj));

    //  Step 1: upload image to cloudinary from memoryStorage (if exists)
    if (req.file) {
      try {
        console.log("[USER_REG] Uploading to Cloudinary...");
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        console.log("[USER_REG] Cloudinary upload success");
      } catch (cloudinaryErr) {
        console.error("[USER_REG] Cloudinary upload error:", cloudinaryErr.message);
        // Continue without image if upload fails
        cloudinaryResult = null;
      }
    }

    // Step 2: call existing register()
    console.log("[USER_REG] Calling register function...");
    const newUserObj = await register({
      ...userObj,
      role: "USER",
      profileImageUrl: cloudinaryResult?.secure_url,
    });
    console.log("[USER_REG] Registration successful");

    res.status(201).json({
      message: "user created",
      payload: newUserObj,
    });
  } catch (err) {
    console.error("[USER_REG] Error caught:", err.message);
    console.error("[USER_REG] Error stack:", err.stack);
    console.error("[USER_REG] Full error:", err);
    
    // Step 3: rollback
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }

    next(err); // send to your error middleware
  }
});

//Read all articles(protected route)
userRoute.get("/articles", verifyToken("USER"), async (req, res) => {
  //read articles of all authors which are active
  const articles = await ArticleModel.find({ isArticleActive: true }).populate("author");
  //send res
  res.status(200).json({ message: "all articles", payload: articles });
});

//Add comment to an article(protected route)
userRoute.put("/articles", verifyToken("USER"), async (req, res) => {
  //get comment obj from req
  const { user, articleId, comment } = req.body;
  //check user(req.user)
  console.log(req.user);
  if (user !== req.user.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  //find artcleby id and update
  let articleWithComment = await ArticleModel.findOneAndUpdate(
    { _id: articleId, isArticleActive: true },
    { $push: { comment: { user, comment } } },
    { new: true, runValidators: true },
  );

  //if article not found
  if (!articleWithComment) {
    return res.status(404).json({ message: "Article not found" });
  }
  //send res
  res.status(200).json({ message: "comment added successfully", payload: articleWithComment });
});

//next() ---> next middleware
//next(err) ---> error handling middleware
