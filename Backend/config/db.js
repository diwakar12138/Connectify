const mongoose = require('mongoose');

async function connection(){
    try{
        await mongoose.connect('mongodb://localhost:27017/g5SocialMedia')
        console.log("mongodb connected successfully")
    }
    catch(error) {
        console.log(`error in connecting database`,error);
    }
}

module.exports=connection