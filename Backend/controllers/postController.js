// const postCollection = require('../models/postCollection');
// const createPost = async(req,res)=>{
//      const {title} = req.body
//      const file = req.file
//      const userId = req.user;

//      let data = await postCollection.insertOne({title,file,userId})
    
//      res.status(201).json({msg:"post created successfully"})
// }
// const getPost = async(req,res)=>{
//     res.send("get post is running")
// }
// const updatePost = async(req,res)=>{
//     res.send("update post is running")
// }
// const deletePost = async(req,res)=>{
//     res.send("delete post is running")
// }


// module.exports={
//     createPost,
//     getPost,
//     updatePost,
//     deletePost
// }







const postCollection = require('../models/postCollection')
const Post = require('../models/postCollection')

// CREATE
const createPost = async (req, res) => {
    try {
        const { title } = req.body
        const file = req.file ? req.file.path : null
        const userId = req.user
        console.log(req.user)
        console.log("userId = ", userId)

        let data = await Post.create({ title, file, userId })

        res.status(201).json({
            msg: "post created successfully",
            data
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Server error" })
    }
}

// GET ALL
const getPosts = async (req, res) => {
      let posts = await postCollection.find().sort({createdAt:-1}).populate({path:'userId',select:"name profilePic"})
      res.status(200).json({posts})
}




// UPDATE
const updatePost = async (req, res) => {
    res.json({ msg: "Post updated" })
}

// DELETE
const deletePost = async (req, res) => {
    res.json({ msg: "Post deleted" })
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
}