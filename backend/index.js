import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cloudinaryConnection from './config/cloudanery.js';
import adminRouter from './routers/adminRouters.js';
import doctorRouter from './routers/doctorRouters.js';
import userDoctor from './routers/userRouter.js';
// import paymentRoutes from "./routers/payment.js";


// App config
const app = express();
const port = process.env.PORT || 3000;

// ✅ Connect to MongoDB & Cloudinary
connectDB();
cloudinaryConnection();

// ✅ Middlewares
app.use(express.json({ limit: '10mb' })); // Support large JSON payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Support large form-data
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userDoctor);
// app.use("/api/payment", paymentRoutes);

// ✅ Test API Endpoint
app.get('/', (req, res) => {
  console.log('✅ Server is running!');
  res.send('Welcome to the Doctors Application API!');
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server started on port: ${port}`);
});
