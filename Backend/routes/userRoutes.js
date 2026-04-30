const express = require('express');
const { createUser, loginUser, updateUser, deleteUser, dummyUpload, forgetPassword, getResetToken, updatePassword } = require('../controllers/userController');
const { uploads } = require('../config/multer');
const router = express.Router();

router.post('/signup' , createUser);
router.post('/login', loginUser);
router.put('/update',updateUser);
router.delete('/delete', deleteUser);
router.post('/uploadPic', uploads.single('image'), dummyUpload);
router.post('/forgetpassword',forgetPassword)

router.get('/forgetpassword/:token',getResetToken)
router.put('/updatepassword/:token',updatePassword)

module.exports = router