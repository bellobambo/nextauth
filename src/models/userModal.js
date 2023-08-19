import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please Provide an Username"],
        unique : true,
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique : true,
    },
    password: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique : true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default : false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyedTokenExpire : Date,

})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User