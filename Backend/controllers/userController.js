const userCollection = require('../models/userCollection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const jwt_secret = "your_secret_key_here"

const nodemailer = require("nodemailer");
var randomstring = require("randomstring");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: 'diwakargautam823@gmail.com',
        pass: process.env.NODE_MAILER,
    },
});


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check if user already exists
        const existingUser = await userCollection.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ msg: "Email already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password.toString(), salt)

        await userCollection.insertOne({
            name,
            email,
            password: hashedPassword
        })

        res.json({ msg: "User registered successfully" })

    } catch (error) {
        res.status(500).json({ msg: "Error creating user", error })
    }
}



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await userCollection.findOne({ email })

        if (!user) {
            return res.status(401).json({ msg: "User not found, please sign up" })
        }

        const isMatch = await bcrypt.compare(
            password.toString(),
            user.password
        )

        if (!isMatch) {
            return res.status(401).json({ msg: "Wrong password" })
        }

        // create token
        const token = jwt.sign(
            { id: user._id },
            jwt_secret,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            msg: "User logged in successfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ msg: "Login error", error })
    }
}



const updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({ msg: "No token provided" })
        }

        const verify = jwt.verify(token, jwt_secret)
        const userId = verify.id

        const { name, password } = req.body

        let updateData = {}

        if (name) {
            updateData.name = name
        }

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password.toString(), salt)
            updateData.password = hashedPassword
        }

        await userCollection.updateOne(
            { _id: userId },
            { $set: updateData }
        )

        res.json({ msg: "User updated successfully" })

    } catch (error) {
        res.status(500).json({ msg: "Update error", error })
    }
}



const deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({ msg: "No token provided" })
        }

        const verify = jwt.verify(token, jwt_secret)
        const userId = verify.id

        await userCollection.deleteOne({ _id: userId })

        res.json({ msg: "User deleted successfully" })

    } catch (error) {
        res.status(500).json({ msg: "Delete error", error })
    }
}


const dummyUpload = async (req, res) => {
    console.log(req.file)
}

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    let user = await userCollection.findOne({ email })

    let randomString = randomstring.generate(80)

    if (user) {
        user.resetToken = randomString;
        await user.save();
        try {
            const info = await transporter.sendMail({
                from: '"Social Media Team" <team@example.com>', // sender address
                to: email, // list of recipients
                subject: "forget password request", // subject line
                text: `Dear ${user.name}, You can reset your password by visiting the following link:http://localhost:8090/users/forgetpassword/${randomString}`, // plain text body
                // html: "<b>Hello world?</b>",  HTML body
            });

            return res.json({ msg: "please check your email for further information" })

            console.log("Message sent: %s", info.messageId);
            // Preview URL is only available when using an Ethereal test account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
            console.error("Error while sending mail:", err);
        }
    }
    else {
        return res.status(400).json({ msg: "user not found please signup" })
    }
}

const getResetToken = async(req,res)=>{
    // res.send("All is well")
    let {token} = req.params
    console.log(token)
    let user = await userCollection.findOne({resetToken:token})
    if(!user){
        return res.status(401).json({msg:"token expired"})
    }
//     let file = __dirname+'/forgetPassword.html'
//     res.sendFile(file);
       res.render('forgetpassword',{token})
}


const updatePassword = async(req,res)=>{
    const salt = await bcrypt.genSalt(10)
    const {password} = req.body;
    const {token} = req.params;

    let user = await userCollection.findOne({resetToken:token})
    if(!user){
        return res.status(401).json({msg:"user not found or token expired !"})
    }
    let hashPassword = await bcrypt.hash(password,salt);
    user.password = hashPassword
    user.resetToken=''
    await user.save()
    res.status(200).json({msg:"password updated successfully"})
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    dummyUpload,
    forgetPassword,
    getResetToken,
    updatePassword
}