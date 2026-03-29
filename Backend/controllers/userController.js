const userCollection = require('../models/userCollection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwt_secret = "your_secret_key_here"  


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


const dummyUpload = async(req,res)=>{
    console.log(req.file)
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    dummyUpload
}