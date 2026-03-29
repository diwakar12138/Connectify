const express = require('express');
const { createUser, loginUser, updateUser, deleteUser, dummyUpload } = require('../controllers/userController');
const upload = require('../config/multer');
const router = express.Router();

router.post('/signup' , createUser);
router.post('/login', loginUser);
router.put('/update',updateUser);
router.delete('/delete', deleteUser);
router.post('/uploadPic',upload.single('image'),dummyUpload)


module.exports = router