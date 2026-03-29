const express = require('express');
const app = express()
const port = 8090;
const cors=require('cors')
const connection = require('./config/db')  //  function
connection()

const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')


app.use(cors())
app.use(express.json())  //parse the data
app.get('/' , (req,res)=>{
    res.send('welcome page')
})

app.use('/users', userRouter);
app.use('/posts',postRouter);

// example --> http://localhost:8090/users/signup --> createUser()
// example --> http://localhost:8090/users/login --> loginUser()

app.use('/uploads',express.static('uploads'))

app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`)
})