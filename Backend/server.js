const { uploads, cloudinary } = require("./config/multer");
const express = require('express');
const app = express()
const port = 8090;
const cors=require('cors')
const connection = require('./config/db')  //  function
connection()


const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.NODE_MAILER)

app.set('view engine','ejs')

// app.use((req,res,next) => {
//   res.header("Access to all URL's origins","*")
// })

app.use(cors());
app.use(express.json())  //parse the data
app.get('/' , (req,res)=>{
    res.send('welcome page')
})

app.use('/users', userRouter);
app.use('/posts',postRouter);

// example --> http://localhost:8090/users/signup --> createUser()
// example --> http://localhost:8090/users/login --> loginUser()

// app.use('/uploads',express.static('uploads'))


app.post("/upload", uploads.single("image"), (req, res) => {
  try {
    res.json({
      msg: "File uploaded successfully",
      url: req.file.path,          // Cloudinary URL
      public_id: req.file.filename // delete ke liye important
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});



app.delete("/delete/:id", async (req, res) => {
  try {
    const public_id = req.params.id;

    const result = await cloudinary.uploader.destroy(public_id);

    res.json({
      msg: "Post deleted successfully",
      result
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});



app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`)
})