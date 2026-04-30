











const express = require('express')
const router = express.Router()

const {
    createPost,
    getPosts,
    updatePost,
    deletePost
} = require('../controllers/postController')
const { uploads } = require('../config/multer');
const verifyToken = require('../middleware/checkToken')




// router.post('/create',upload.single('image'),verifyToken,createPost);
router.post('/create', verifyToken, uploads.single('image'), createPost)
router.get('/allpost', getPosts)
router.put('/update/:id', updatePost)
router.delete('/delete/:id', deletePost)

module.exports = router