import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
require('dotenv').config();
import {connectToDatabase} from "./config/connection"
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials
  };
  app.use(cors(corsOptions));


// Routes
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API! Make a GET request to see this message.');
  });

// Connect to MongoDB
connectToDatabase()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
