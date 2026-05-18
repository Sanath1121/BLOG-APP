import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../models/articleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const authorRoute = exp.Router();

//Register author(public)
authorRoute.post("/users", (req, res, next) => {
  upload.single("profileImageUrl")(req, res, (err) => {
    if (err) {
      console.error("[AUTHOR_REG] Multer error:", err.message);
      return res.status(400).json({ 
        message: "error occurred", 
        error: `File upload failed: ${err.message}` 
      });
    }
    
    // Multer processing complete, proceed with registration
    handleAuthorRegistration(req, res, next);
  });
});

async function handleAuthorRegistration(req, res, next) {
  let cloudinaryResult;
  console.log("[AUTHOR_REG] Incoming request body:", req.body);
  console.log("[AUTHOR_REG] File received:", req.file ? "yes" : "no");
  console.log("[AUTHOR_REG] Headers:", req.headers);

  try {
    //getb user obj
    let userObj = req.body;
    console.log("[AUTHOR_REG] User object keys:", Object.keys(userObj));

    //  Step 1: upload image to cloudinary from memoryStorage (if exists)
    if (req.file) {
      try {
        console.log("[AUTHOR_REG] Uploading to Cloudinary...");
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        console.log("[AUTHOR_REG] Cloudinary upload success");
      } catch (cloudinaryErr) {
        console.error("[AUTHOR_REG] Cloudinary upload error:", cloudinaryErr.message);
        // Continue without image if upload fails
        cloudinaryResult = null;
      }
    }

    // Step 2: call existing register()
    console.log("[AUTHOR_REG] Calling register function...");
    const newUserObj = await register({
      ...userObj,
      role: "AUTHOR",
      profileImageUrl: cloudinaryResult?.secure_url,
    });
    console.log("[AUTHOR_REG] Registration successful");

    res.status(201).json({
      message: "user created",
      payload: newUserObj,
    });
  } catch (err) {
    console.error("[AUTHOR_REG] Error caught:", err.message);
    console.error("[AUTHOR_REG] Error stack:", err.stack);
    console.error("[AUTHOR_REG] Full error:", err);
    
    // Step 3: rollback
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }

    return res.status(err.status || 500).json({
      message: "error occurred",
      error: err.message || "Server side error",
    });
  }
}

//Create article(protected route)
authorRoute.post("/articles", verifyToken("AUTHOR"), async (req, res) => {
  //get article from req
  let article = req.body;

  //create article document
  let newArticleDoc = new ArticleModel(article);
  //save
  let createdArticleDoc = await newArticleDoc.save();
  //send res
  res.status(201).json({ message: "article created", payload: createdArticleDoc });
});

//Read artiles of author(protected route)
authorRoute.get("/articles/:authorId", verifyToken("AUTHOR"), async (req, res) => {
  //get author id
  let aid = req.params.authorId;

  //read atricles by this author which are acticve
  let articles = await ArticleModel.find({ author: aid }).populate("author", "firstName email");
  //send res
  res.status(200).json({ message: "articles", payload: articles });
});

//edit article(protected route)
authorRoute.put("/articles", verifyToken("AUTHOR"), async (req, res) => {
  console.log(req.body);
  let author = req.user.userId;
  //get modified article from req
  let { articleId, title, category, content } = req.body;
  console.log(articleId, author);
  //find article
  let articleOfDB = await ArticleModel.findOne({ _id: articleId, author: author });
  console.log(articleOfDB);
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }

  //update the article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,
    {
      $set: { title, category, content },
    },
    { new: true },
  );
  //send res(updated article)
  res.status(200).json({ message: "article updated", payload: updatedArticle });
});

//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleModel.findById(id); //.populate("author");
  console.log(article);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" && article.author.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    payload: article, // ✅ use payload instead of article
  });
});
