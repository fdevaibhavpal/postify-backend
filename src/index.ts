import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
require('dotenv').config();
import {connectToDatabase} from "./config/connection"
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API! Make a GET request to see this message.');
  });

// Connect to MongoDB
connectToDatabase()

// Start server
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
