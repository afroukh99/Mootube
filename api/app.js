import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js'
import videoRouter from './routes/video.js'
import commentRouter from './routes/comment.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'



const app = express();
dotenv.config()
const port = process.env.PORT || 8800





const connect = () => {
    mongoose.connect(process.env.URI)
        .then(() => {
            console.log('connected to database')
        }).catch((err)=> {
            throw err
        })
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/video',videoRouter)
app.use('/api/comments',commentRouter)

app.use((error,req,res,next)=> {
    const status =error.stauts || 500;
    const message =error.message || 'Something went wrong';
    return res.status(status).json( {
        succcess:false,
        status,
        message
    })
})

app.listen(port,()=> {
    connect()
    console.log(`Server running on port ${port}`)
})