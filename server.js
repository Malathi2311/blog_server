import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import authRouter from './routes/authRoutes.js';




const app = express();

await connectDB()

//Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://jade-eclair-d0c39c.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options('*', cors());  


app.use(express.json())
app.use('/api/auth', authRouter);


app.get('/',(req, res)=> res.send("API is Working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is running on port' + PORT)
})

export default app;
