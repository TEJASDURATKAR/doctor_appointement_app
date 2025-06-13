import express from 'express'; // Removed `{ json }`
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cloudinaryConnection from './config/cloudanery.js';
import adminRouter from './routers/adminRouters.js'
import doctorRouter from './routers/doctorRouters.js'
import userDoctor from './routers/userRouter.js'

// App config
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB & Cloudinary
connectDB();
cloudinaryConnection();

// Middlewares
app.use(express.json());
app.use(cors()); // You can configure CORS options if needed

 //Api Endpoints
 app.use('/api/admin',adminRouter)
 app.use('/api/doctor',doctorRouter)
 app.use('/api/user',userDoctor)



// Test API Endpoint
app.get('/', (req, res) => {
    console.log('✅ Server is running!');
    res.send('Welcome to the Doctors Application API!');
});


// Start the server
app.listen(port, () => {
    console.log(`🚀 Server started on port: ${port}`);
});
