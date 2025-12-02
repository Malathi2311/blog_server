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
const allowedOrigins = [
  'http://localhost:5173',
  'https://jade-eclair-d0c39c.netlify.app',
  
]

app.use(cors({
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: origin not allowed'), false);
    }
    return callback(null, true);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
}));

app.use(express.json())
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    
    return res.sendStatus(200);
  }
  next();
});

app.use('/api/auth', authRouter);


app.get('/',(req, res)=> res.send("API is Working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is running on port' + PORT)
})

export default app;
