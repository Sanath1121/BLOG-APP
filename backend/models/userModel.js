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
        unique:[true,"Email already exists"],
        lowercase:true,
        trim:true
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

// Pre-save hook to normalize email (extra safety layer)
userSchema.pre('save', function(next) {
    if(this.email) {
        this.email = this.email.toLowerCase().trim();
    }
    next();
});

export const UserTypeModel = model("user",userSchema);

