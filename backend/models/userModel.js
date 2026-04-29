import {Schema,model} from "mongoose"

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"]
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    profileImageUrl:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true,"{Value} is an invalid role"]
    }
},
{
    strict:"throw",
    timestamps:true,
    versionKey:false
});

export const UserTypeModel = model("user",userSchema);

