const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
async function connection(){
    try{
        let localURL = 'mongodb://localhost:27017/g5SocialMedia'
        let URL = "mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@socialmediag5.fks1ore.mongodb.net/?appName=SocialMediaG5"
        await mongoose.connect("mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@socialmediag5.fks1ore.mongodb.net/?appName=SocialMediaG5")
        console.log("mongodb connected successfully")
    }
    catch(error) {
        console.log(`error in connecting database`,error);
    }
}

module.exports=connection