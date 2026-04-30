const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 250
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ['male,;female']
    },

    profilePic: {
        type: String,
        default: "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_user_personalization&w=740&q=80"
    },

    coverPic:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZo-h4dGeasT5yJt1yiHI_KIqPE-0ijQnNdg&s"
    }

},{timestamps:true})

// module.exports = mongoose.model('collectionName',StructureFollow(rules to be ))
userSchema.add({
    resetToken:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('users',userSchema)