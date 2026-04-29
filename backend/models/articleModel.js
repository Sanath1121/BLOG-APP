import { Schema, model } from "mongoose";

//create user comment schema
const userCommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comment: {
        type: String
    }
})
//create article Schema
const articleSchema = new Schema({
    author: {
        type: String,
        required: [true, "Author is required"],
        ref: "user"
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    category: {
        type: String,
        required: [true, "Invalid category"]
    },
    content: {
        type: String,
        required: true
    },
    comment: [userCommentSchema],
    isArticleActive: {
        type: Boolean,
        default: true
    }
},
    {
        strict: "throw",
        timestamps: true,
        versionKey: false
    })

export const ArticleModel = model("article", articleSchema) 